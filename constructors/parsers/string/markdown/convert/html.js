String.prototype.markdown	= function (options) {
	options = Object.assign(
		{
			URLWrapper: function (string, selector, markdown) {
				return string;
			}
		},
		options || {}
	);
	var s = this;var h='';
	
	function E(s){
		return s.replace(/./gu, function (s) {
			if (s.length > 1) return s;
			return escape(s + "").replace(/\%u([0-9a-f]{4})/gi, function (e) {
				return unescape(e);
			}).replace(/\%([0-9a-f]{2})/gi,'&#x$1;')
				.replace(/\&\#x20\;/gi,' ')
				.replace(/\&\#x5f\;/gi,'_')
				.replace(/\&\#x7e\;/gi,'~')
				.replace(/\&\#x26\;/gi,'&')
				.replace(/\&\#x2a\;/gi,'*')
				.replace(/\&\#x5b\;/gi,'[')
				.replace(/\&\#x5d\;/gi,']')
				.replace(/\&\#x5c\;/gi,'\x5c')
				.replace(/\&\#x23\;/gi,'#')
				.replace(/\&\#x3d\;/gi,'=')
				.replace(/\&\#x21\;/gi,'!')
				.replace(/\&\#x2e\;/gi,'.')
				.replace(/\&\#x2c\;/gi,',')
				.replace(/\&\#x3a\;/gi,':')
				.replace(/\&\#x3b\;/gi,';')
				.replace(/\&\#x0a\;/gi,'\n')
				.replace(/\&\#x0d\;/gi,'\r')
				.replace(/\&\#x09\;/gi,'\t')
				.replace(/\&\#x60\;/gi,'`')
				.replace(/\&\#x28\;/gi,'(')
				.replace(/\&\#x29\;/gi,')')
				.replace(/\&\#x25\;/gi,'%')
				.replace(/\&\#x02\;/gi,'\x02')
		});
	}

	
	function I(s, nodes, node_k){
		nodes	= nodes || {};
		node_k	= node_k || 0;
		var f_match	= function (str, upd) {
			if (typeof(str) === "string") {
				node_k++;
				s	= s.split(str).join('\x02'+node_k+'\x02');
				nodes[node_k]	= upd + "";
			} else {
				var m	= null;
				var v_match	= [];
				var data	= "";
				while(m = s.match(str)) {
					node_k++;
					s	= s.split(m[0]).join('\x02'+node_k+'\x02');
					data	= "";
					v_match	= [];
					m[0].replace(str, function () {
						v_match	= arguments;
						return '';
					});
					if (typeof(upd) === "function") {
						data	= upd.apply(s, v_match);
					} else {
						data	= (upd + "").replace(/\$(\d+)/g, function (s0, s1) {
							s1	= (parseInt(s1, 10) || 0);
							if (s1 && typeof(v_match[s1]) !== "undefined") {
								return v_match[s1];
							}
							return s0;
						});
					}
					nodes[node_k]	= data;
				}
			}
		}
		var f_apply	= function () {
			var m	= null;
			var l	= 237;
			while (m = s.match(/\x02(\d+)\x02/) && l-- > 0) {
				s	= s.replace(/\x02(\d+)\x02/, function(s0, s1) {
					s1	= (parseInt(s1, 10) || 0);
					if (s1 && typeof(nodes[s1]) !== "undefined") {
						return nodes[s1] || "";
					}
					return '';
				})
			}
		}

		s	= E(s);
		f_match("\x5c\x5c","\x5c");
		f_match("\x5c`","`");
		f_match("\x5c_","_");
		f_match("\x5c[","[");
		f_match("\x5c]","]");
		f_match("\x5c)",")");
		f_match("\x5c(","(");
		f_match("\x5c*","*");
		f_match("\x5c~","~");
		f_match("\x5c&","&");

		f_match(
			/```([a-z\-0-9\.\/])\s*\n([\s\S]+?)```/g,
			function (s0, s1, s2) {
				return '<code-pretty language="'+ s1 +'"><pre class="language-'+ s1 +'"><code lang="'+ s1 +'">' + (
					s2
						.replace(/\&/g, '&amp;')
						.replace(/\>/g, '&gt;')
						.replace(/</g, '&lt;')
				) + '</code></pre></code-pretty>';
			}
		);
		f_match(
			/``([\s\S]+?)``/g,
			function (s0, s1) {
				return '<pre><code>' + (
					s1
						.replace(/\&/g, '&amp;')
						.replace(/\>/g, '&gt;')
						.replace(/</g, '&lt;')
				) + '</code></pre>';
			}
		);
		f_match(
			/`([^`]+)`/g,
			function (s0, s1) {
				return '<code>' + (
					s1
						.replace(/\&/g, '&amp;')
						.replace(/\>/g, '&gt;')
						.replace(/</g, '&lt;')
				) + '</code>';
			}
		);


		f_match(/\!image\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<img style="width: ' + (s1) + '; height:'+ (s2) + ';" src="'+E(options.URLWrapper(s4, 'img[src]', s0))+'" title="'+E(s3)+'" />';
		});
		// f_match(/\!image\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\(([^(]+)\)/g,'<img width="$1" height="$2" src="$4" title="$3" />');
		
		f_match(/\!\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2) {
			return "<img src=\""+E(options.URLWrapper(s2, 'img[src]', s0))+"\" title=\""+E(s1)+"\" alt=\""+E(s1)+"\">";
		});

		f_match(/\!object\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<object style="width: ' + (s1) + '; height:'+ (s2) + ';" src="'+E(options.URLWrapper(s4, 'object[src]', s0))+'" title="'+E(s3)+'">'+E(s3)+'</object>';
		});
		f_match(/\!iframe\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<iframe style="width: ' + (s1) + '; height:'+ (s2) + ';" src="'+E(options.URLWrapper(s4, 'iframe[src]', s0))+'" title="'+E(s3)+'">'+E(s3)+'</iframe>';
		});
		// f_match(/\!iframe\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\(([^(]+)\)/g,'<iframe width="$1" height="$2" src="$4" frameborder="0" allowfullscreen >$3</iframe>');
		f_match(/\!video\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<video style="width: ' + (s1) + '; height:'+ (s2) + ';" controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(options.URLWrapper(s, 'video[src]', s0)).replace('#','" type="')+'">';}).join("")+''+I(s3, nodes, node_k)+'</video>';
		});
		f_match(/!audio\[([^\]]*)]\(([^()]+)\)/g, function (s0, s3, s4) {
			return '<audio controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(options.URLWrapper(s, 'audio[src]', s0)).replace('#','" type="')+'">';}).join("")+''+I(s3, nodes, node_k)+'</audio>';
		});
		
		f_match(/\!image\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\[([^(]+)\]/g, function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<img style="width: ' + (s1) + '; height:'+ (s2) + ';" src="' + E(options.URLWrapper(references[s4], 'img[src]', s0)) + '" title="' + s3 + '" />';
		});
		f_match(/\!\[([^\]]*)]\[([^(]+)\]/g, function (s0, s1, s2) {
			return "<img src=\""+E(options.URLWrapper(references[s2], 'img[src]', s0))+"\" title=\""+E(s1)+"\" alt=\""+E(s1)+"\">";
		});

		f_match(/\!object\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\[([^(]+)\]/g, function (s0, s1, s2, s3, s4) {
			return '<object width="' + s1 + '" height="' + s2 + '" src="' + E(options.URLWrapper(references[s4], 'object[src]', s0)) + '">' + s3 + '</object>'
		});
		f_match(/\!iframe\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\[([^(]+)\]/g,  function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<iframe style="width: ' + (s1) + '; height:'+ (s2) + ';" src="' + E(options.URLWrapper(references[s4], 'iframe[src]', s0)) + '" frameborder="0" allowfullscreen >' + s3 + '</iframe>';
		});
		f_match(/\!video\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\[([^(]+)\]/g, function (s0, s1, s2, s3, s4) {
			if (s1.match(/^\d+$/)) {
				s1 += 'px';
			}
			if (s2.match(/^\d+$/)) {
				s2 += 'px';
			}
			return '<video style="width: ' + (s1) + '; height:'+ (s2) + ';" controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(options.URLWrapper(references[s], 'video[src]', s0)).replace('#','" type="')+'">';}).join("")+''+I(s3, nodes, node_k)+'</video>';
		});
		f_match(/!audio\[([^\]]*)]\[([^()]+)\]/g, function (s0, s3, s4) {
			return '<audio controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(options.URLWrapper(references[s], 'audio[src]', s0)).replace('#','" type="')+'">';}).join("")+''+I(s3, nodes, node_k)+'</audio>';
		});

		f_match(/\[([^\]]*)]\(([^()]+)\)\[blank\]/g, function (s0, s1, s2) {
			return "<a href=\""+E(options.URLWrapper(s2, 'a[href]', s0))+"\" target=\"_blank\">"+I(s1, nodes, node_k)+"</a>";
		});
		f_match(/\[([^\]]*)]\(([^()]+)\)\[download\=([^\]]+)\]/g, function (s0, s1, s2, s3) {
			return "<a href=\""+E(options.URLWrapper(s2, 'a[href]', s0))+"\" download=\""+E(s3)+"\">"+I(s1, nodes, node_k)+"</a>";
		});
		f_match(/\[([^\]]*)]\(([^()]+)\)\[([^\]]+)\]/g, function (s0, s1, s2, s3) {
			return "<a href=\""+E(options.URLWrapper(s2, 'a[href]', s0))+"\" name=\""+E(s3)+"\">"+I(s1, nodes, node_k)+"</a>";
		});
		f_match(/\[([^\]]+)]\(([^()]+)\)/g, function (s0, s1, s2) {
			return "<a href=\""+E(options.URLWrapper(s2, 'a[href]', s0))+"\">"+I(s1, nodes, node_k)+"</a>";
		});

		f_match(/\[([^\]]*)]\[([^()]+)\]\[blank\]/g, function (s0, s1, s2) {
			return "<a href=\""+E(options.URLWrapper(references[s2], 'a[href]', s0))+"\" target=\"_blank\">"+I(s1, nodes, node_k)+"</a>";
		});
		f_match(/\[([^\]]*)]\[([^()]+)\]\[download\=([^\]]+)\]/g, function (s0, s1, s2, s3) {
			return "<a href=\""+E(options.URLWrapper(references[s2], 'a[href]', s0))+"\" download=\""+E(s3)+"\">"+I(s1, nodes, node_k)+"</a>";
		});
		f_match(/\[([^\]]*)]\[([^()]+)\]\[([^\]]+)\]/g, function (s0, s1, s2, s3) {
			return "<a href=\""+E(options.URLWrapper(references[s2], 'a[href]', s0))+"\" name=\""+E(s3)+"\">"+I(s1, nodes, node_k)+"</a>";
		});
		f_match(/\[([^\]]*)]\[([^()]+)\]/g, function (s0, s1, s2) {
			return "<a href=\""+E(options.URLWrapper(references[s2], 'a[href]', s0))+"\">"+I(s1, nodes, node_k)+"</a>";
		});

		f_match(/(\_\_\_)([^\<\>]+?)\1/g, function (s0, s1, s2) {
			return '<u>'+I(s2, nodes, node_k)+'</u>';
		});
		f_match(/(\*\*|\_\_)([^\<\>]+?)\1/g, function (s0, s1, s2) {
			return '<strong>'+I(s2, nodes, node_k)+'</strong>';
		});
		f_match(/(\*|\_)([^\<\>]+?)\1/g, function (s0, s1, s2) {
			return '<em>'+I(s2, nodes, node_k)+'</em>';
		});
		f_match(/(\~)([^\<\>]+?)\1/g, function (s0, s1, s2) {
			return '<s>'+I(s2, nodes, node_k)+'</s>';
		});

		f_match(/(http|https|ftp|ftps|mailto|tel)\:[^\s\n]+/g, function (s0, s1, s2) {
			return "<a href=\""+E(options.URLWrapper(s0, 'a[href]', s0))+"\">"+E(s0)+"</a>";
		});

		f_apply();

		return s;
	};

	var tables = [];
	var references = {};

	s = s
	.replace(/^\s+|\r|\s+$/g,'')
	.replace(/(^|\n)\[([a-z0-9\-\.]+)\]\:\s+([^\n]*)/g, function (s0, s1, s2, s3) {
		references[s2] = s3.replace(/\s+$/, '');
		return '';
	})
	.replace(/\t/g,'    ')
	.replace(/(((\|[^\|\n]+)+\|?[\040\t]*\n)((\|[\040\t]*[\-\:]+)([\040\t]*\|[\040\t]*[\-\:]+)*[\040\t]*\|?[\040\t]*)(\n(\|[^\|\n]+)+([\040\t]*(\||)[\040\t]*))*)/g, function (s0, s1, s2) {
		var rows = s0.split("\n").map(function (r) {
			return r.replace(/\|\s*$/, '').replace(/^\|/, '');
		});
		var header = rows.shift()

		var align  = rows.shift().split(/\|/g).map(function (v) {
			if (v.match(/^\s*\:\-+\:\s*/)) {
				return "center";
			} else if (v.match(/^\s*\-+\:\s*/)) {
				return "right";
			} else if (v.match(/^\s*\:\-+\s*/)) {
				return "left";
			}
			return null;
		});
		var rows   = rows.map(function (r) {
			return r.split('|');
		});

		var table  = [
			'<table class="table">',
			'<thead>',
			'<tr>'
		];

		header.split('|').forEach(function (c, i) {
			var err;
			try {
				table.push('<th' + ( align[i] ? ( ' align="' + align[i] + '"' ) : '' ) + '>' + I(c) + '</th>');
			} catch (err) {
				console.error("markdown", err);
				table.push('<th' + ( align[i] ? ( ' align="' + align[i] + '"' ) : '' ) + '>' + c + '</th>');
			}
		});

		table.push('</tr>');
		table.push('</thead>');
		table.push('<tbody>');

		rows.forEach(function (r, i) {
			table.push('<tr class="' + ( i % 2 ? "even" : "odd" ) + '">');
			r.forEach(function (c) {
				var err;
				try {
					table.push('<td>' + I(c) + '</td>');
				} catch (err) {
					console.error("markdown", err);
					table.push('<td>' + c + '</td>');
				}
			});
			table.push('</tr>');
		});

		table.push('</tbody>');
		table.push('</table>');
		tables.push(table.join(''));
		return '\x02TABLE:' + (tables.length - 1) + '\x02';
	});
	s.split('\n```').forEach(function (s, k, list) {
		if (k % 2) {
			s	= s.split(/\n/);
			var lang	= E(s.shift().replace(/^\s+/,'').replace(/\s+$/,''));
			h += '<pre class="language-'+lang+'"><code lang="'+lang+'">'+E(s.join('\n'))+'</code></pre>';
		} else {
			var statuses	= {
				'p'    : function () { return { type: 'p', indent : 1, rows: [] } },
				'code' : function () { return { type: 'code', rows: [] } },
				'ul'   : function () { return { type: 'ul', style: '*', items : [] } },
				'ol'   : function () { return { type: 'ol', style: 'number', items : [] } },
				'quote': function () { return { type: 'quote', rows: [] } },
				'h1'   : function () { return { type: 'h1', rows: [] } },
				'h2'   : function () { return { type: 'h2', rows: [] } },
				'h3'   : function () { return { type: 'h3', rows: [] } },
				'h4'   : function () { return { type: 'h4', rows: [] } },
				'h5'   : function () { return { type: 'h5', rows: [] } },
				'h6'   : function () { return { type: 'h6', rows: [] } },
				'hr'   : function () { return { type: 'hr', rows: [] } }
			};
			var data	= [];
			var current	= statuses.p();
			s.split("\n").forEach(function (line, k, lines) {
				var status	= current.type;
				var m;
				if (/*k > 0 && lines[k-1] === '' && */line === '' || status === 'hr') {
					status	= 'p';
				}
				if (line.match(/^\x23{1}\s/))	status	= 'h1';
				if (line.match(/^\x23{2}\s/))	status	= 'h2';
				if (line.match(/^\x23{3}\s/))	status	= 'h3';
				if (line.match(/^\x23{4}\s/))	status	= 'h4';
				if (line.match(/^\x23{5}\s/))	status	= 'h5';
				if (line.match(/^\x23{6}\s/))	status	= 'h6';
				if (line.match(/^\>\s/))	status	= 'quote';
				if (['p','quote'].indexOf(status) !== -1) {
					if (['-','*'].indexOf(line[0] || '') !== -1) {
						if ([' ','\t'].indexOf(line[1] || '') !== -1) {
							status = 'ul';
						} else if (
							line.match(/^\*\s*\*+\s*\*\s*$/)
							||
							line.match(/^\-\s*\-+\s*\-\s*$/)
						) {
							status = 'hr';
						} else {
							status	= 'ul';
						}
					} else if (line.match(/^\d+\.\s/)) {
						status	= 'ol';
					}
				} else if (status === 'code' && !line.match(/^\040\040\040\040/)) {
					status	= 'p';
				}
				if (['p','quote','h1','h2','h3','h4','h5','h6'].indexOf(status) !== -1 && line.match(/^\040\040\040\040/)) {
					status	= 'code';
				}
				if (current.type !== status) {
					data.push(current);
					current	= statuses[status]();
				}
				switch(current.type) {
					case 'h1':
					case 'h2':
					case 'h3':
					case 'h4':
					case 'h5':
					case 'h6':
					case 'p':
					case 'quote':
						if (current.type[0] === 'h') {
							current.rows.push(line.replace(/^\x23+\s/gi,''));
						} else if (current.type === 'quote') {
							current.rows.push(line.replace(/^\>\s/gi,''));
						} else {
							current.rows.push(line);
						}
					break;
					case 'code':
						current.rows.push(line.replace(/^\040\040\040\040/,''));
					break;
					case 'hr':
						current.rows.push('<hr />');
					break;
					case 'ol':
					case 'ul':
						m = false;
						if (current.type === 'ol') {
							m = !(line.match(/^\s*\d+\.[\040\t]\s*/));
						} else if (current.type === 'ul') {
							m = !(line.match(/^\s*[\-\*][\040\t]\s*/));
						}
						if (m) {
							if (current.items.length) {
								current.items[current.items.length - 1].row	= (current.items[current.items.length - 1].row || '') + "\n" + line.replace(/^\s*/,'')
							} else {
								current.items.push({
									level	: Math.ceil((line.match(/^\040+/) || [''])[0].length / 4),
									row		: line.replace(/^\s*\S\s*/,'')
								});
							}
						} else {
							current.items.push({
								level	: Math.ceil((line.match(/^\040+/) || [''])[0].length / 4),
								row		: line.replace(/^\s*(\d+\.|\S)\s*/,'')
							});
						}
					break;
				}
			});
			if (current.type) {
				data.push(current);
			}
			// console.log(data);
			if (data.length) {
				if (data[0].type === "p") {
					if (data[0].rows.length === 0) {
						data.shift();
					}
				}
			}
			h += data.map(function (node) {
				if (node.type === 'h1') {
					return '<h1>'+I(node.rows.join('\n'))+'</h1>';
				} else if (node.type === 'h2') {
					return '<h2>'+I(node.rows.join('\n'))+'</h2>';
				} else if (node.type === 'h3') {
					return '<h3>'+I(node.rows.join('\n'))+'</h3>';
				} else if (node.type === 'h4') {
					return '<h4>'+I(node.rows.join('\n'))+'</h4>';
				} else if (node.type === 'h5') {
					return '<h5>'+I(node.rows.join('\n'))+'</h5>';
				} else if (node.type === 'h6') {
					return '<h6>'+I(node.rows.join('\n'))+'</h6>';
				} else if (node.type === 'hr') {
					return '<hr />';
				} else if (node.type === 'p') {
					return (
						'<p>'+node.rows.map(function (row) {
							if (row === '') return '\x03';
							return I(row);
						}).join('')
							.replace(/^[\x03]+/, '')
							.replace(/[\x03]+$/, '')
							.replace(/[\x03]{2,}/g, '</p><p>')
							.replace(/[\x03]{1}/g, '<br>')+'</p>'
					).replace(/<p><\/p>/, '');
				} else if (node.type === 'quote') {
					return '<blockquote>'+I(node.rows.join('\n').replace(/^\n+/,'').replace(/\n+$/,''))+'</blockquote>'
				} else if (node.type === 'code') {
					return '<pre><code>'+node.rows.join('\n')+'</code></pre>';
				} else if (['ol', 'ul'].indexOf(node.type) != -1) {
					var code	= [];
					var index	= -1;
					node.items.forEach(function (li) {
						if (index < li.level) {
							while (index < li.level) {
								index++;
								code.push('<'+node.type+'>');
							}
						}
						if (index > li.level) {
							while (index > li.level) {
								index--;
								code.push('</'+node.type+'>');
							}
						}
						// console.log("Link Code", );
						code.push('<li>'+I(li.row+'')+'</li>');
					});
					if (index > -1) {
						while (index > -1) {
							index--;
							code.push('</'+node.type+'>');
						}
					}
					return code.join('');
				} else {
					return JSON.stringify(node);
				}
			}).join('');
			/*
			(s+'').split(/\n\n+/)
			.forEach(function(b,f,R){
				R={
					'*':[/\n\* /,'<ul><li>','</li></ul>'],
					1:[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],
					' ':[/\n    /,'<pre><code>','</pre></code>','\n'],
					'>':[/\n> /,'<blockquote>','</blockquote>','\n']
				}[f=b[0]];
				h+=R?R[1]+('\n'+b).split(R[0]).slice(1).map(R[3]?E:I).join(R[3]||'</li>\n<li>')+R[2]:f=='#'?'<h'+(f=b.indexOf(' '))+'>'+I(b.slice(f+1))+'</h'+f+'>':f=='<'?b:'<p>'+I(b)+'</p>'
			})
			*/
		}
	});

	tables.forEach(function (table, index) {
		h = h.replace('\x02TABLE:' + index + '\x02', table);
	});

	return h;
};

module.exports = function markdown2Html(data, options) {
	return data.markdown(options);
};