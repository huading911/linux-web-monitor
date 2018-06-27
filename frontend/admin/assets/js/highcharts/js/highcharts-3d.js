/*
 Highcharts JS v6.1.0 (2018-04-13)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(C){"object"===typeof module&&module.exports?module.exports=C:C(Highcharts)})(function(C){(function(b){var p=b.deg2rad,B=b.pick;b.perspective=function(n,v,A){var x=v.options.chart.options3d,f=A?v.inverted:!1,y=v.plotWidth/2,u=v.plotHeight/2,r=x.depth/2,k=B(x.depth,1)*B(x.viewDistance,0),a=v.scale3d||1,e=p*x.beta*(f?-1:1),x=p*x.alpha*(f?-1:1),g=Math.cos(x),m=Math.cos(-e),d=Math.sin(x),c=Math.sin(-e);A||(y+=v.plotLeft,u+=v.plotTop);return b.map(n,function(b){var e,t;t=(f?b.y:b.x)-y;var w=(f?
b.x:b.y)-u,F=(b.z||0)-r;e=m*t-c*F;b=-d*c*t+g*w-m*d*F;t=g*c*t+d*w+g*m*F;w=0<k&&k<Number.POSITIVE_INFINITY?k/(t+r+k):1;e=e*w*a+y;b=b*w*a+u;return{x:f?b:e,y:f?e:b,z:t*a+r}})};b.pointCameraDistance=function(b,v){var n=v.options.chart.options3d,x=v.plotWidth/2;v=v.plotHeight/2;n=B(n.depth,1)*B(n.viewDistance,0)+n.depth;return Math.sqrt(Math.pow(x-b.plotX,2)+Math.pow(v-b.plotY,2)+Math.pow(n-b.plotZ,2))};b.shapeArea=function(b){var v=0,n,x;for(n=0;n<b.length;n++)x=(n+1)%b.length,v+=b[n].x*b[x].y-b[x].x*
b[n].y;return v/2};b.shapeArea3d=function(n,v,A){return b.shapeArea(b.perspective(n,v,A))}})(C);(function(b){function p(a,c,h,d,b,e,g,k){var z=[],w=e-b;return e>b&&e-b>Math.PI/2+.0001?(z=z.concat(p(a,c,h,d,b,b+Math.PI/2,g,k)),z=z.concat(p(a,c,h,d,b+Math.PI/2,e,g,k))):e<b&&b-e>Math.PI/2+.0001?(z=z.concat(p(a,c,h,d,b,b-Math.PI/2,g,k)),z=z.concat(p(a,c,h,d,b-Math.PI/2,e,g,k))):["C",a+h*Math.cos(b)-h*t*w*Math.sin(b)+g,c+d*Math.sin(b)+d*t*w*Math.cos(b)+k,a+h*Math.cos(e)+h*t*w*Math.sin(e)+g,c+d*Math.sin(e)-
d*t*w*Math.cos(e)+k,a+h*Math.cos(e)+g,c+d*Math.sin(e)+k]}var B=Math.cos,n=Math.PI,v=Math.sin,A=b.animObject,x=b.charts,f=b.color,y=b.defined,u=b.deg2rad,r=b.each,k=b.extend,a=b.inArray,e=b.map,g=b.merge,m=b.perspective,d=b.pick,c=b.SVGElement,l=b.SVGRenderer,q=b.wrap,t=4*(Math.sqrt(2)-1)/3/(n/2);q(l.prototype,"init",function(a){a.apply(this,[].slice.call(arguments,1));r([{name:"darker",slope:.6},{name:"brighter",slope:1.4}],function(a){this.definition({tagName:"filter",id:"highcharts-"+a.name,children:[{tagName:"feComponentTransfer",
children:[{tagName:"feFuncR",type:"linear",slope:a.slope},{tagName:"feFuncG",type:"linear",slope:a.slope},{tagName:"feFuncB",type:"linear",slope:a.slope}]}]})},this)});l.prototype.toLinePath=function(a,c){var d=[];r(a,function(a){d.push("L",a.x,a.y)});a.length&&(d[0]="M",c&&d.push("Z"));return d};l.prototype.toLineSegments=function(a){var c=[],d=!0;r(a,function(a){c.push(d?"M":"L",a.x,a.y);d=!d});return c};l.prototype.face3d=function(a){var c=this,h=this.createElement("path");h.vertexes=[];h.insidePlotArea=
!1;h.enabled=!0;q(h,"attr",function(a,h){if("object"===typeof h&&(y(h.enabled)||y(h.vertexes)||y(h.insidePlotArea))){this.enabled=d(h.enabled,this.enabled);this.vertexes=d(h.vertexes,this.vertexes);this.insidePlotArea=d(h.insidePlotArea,this.insidePlotArea);delete h.enabled;delete h.vertexes;delete h.insidePlotArea;var z=m(this.vertexes,x[c.chartIndex],this.insidePlotArea),e=c.toLinePath(z,!0),z=b.shapeArea(z),z=this.enabled&&0<z?"visible":"hidden";h.d=e;h.visibility=z}return a.apply(this,[].slice.call(arguments,
1))});q(h,"animate",function(a,h){if("object"===typeof h&&(y(h.enabled)||y(h.vertexes)||y(h.insidePlotArea))){this.enabled=d(h.enabled,this.enabled);this.vertexes=d(h.vertexes,this.vertexes);this.insidePlotArea=d(h.insidePlotArea,this.insidePlotArea);delete h.enabled;delete h.vertexes;delete h.insidePlotArea;var z=m(this.vertexes,x[c.chartIndex],this.insidePlotArea),e=c.toLinePath(z,!0),z=b.shapeArea(z),z=this.enabled&&0<z?"visible":"hidden";h.d=e;this.attr("visibility",z)}return a.apply(this,[].slice.call(arguments,
1))});return h.attr(a)};l.prototype.polyhedron=function(a){var c=this,h=this.g(),d=h.destroy;h.faces=[];h.destroy=function(){for(var a=0;a<h.faces.length;a++)h.faces[a].destroy();return d.call(this)};q(h,"attr",function(a,d,b,z,e){if("object"===typeof d&&y(d.faces)){for(;h.faces.length>d.faces.length;)h.faces.pop().destroy();for(;h.faces.length<d.faces.length;)h.faces.push(c.face3d().add(h));for(var g=0;g<d.faces.length;g++)h.faces[g].attr(d.faces[g],null,z,e);delete d.faces}return a.apply(this,[].slice.call(arguments,
1))});q(h,"animate",function(a,d,b,z){if(d&&d.faces){for(;h.faces.length>d.faces.length;)h.faces.pop().destroy();for(;h.faces.length<d.faces.length;)h.faces.push(c.face3d().add(h));for(var e=0;e<d.faces.length;e++)h.faces[e].animate(d.faces[e],b,z);delete d.faces}return a.apply(this,[].slice.call(arguments,1))});return h.attr(a)};l.prototype.cuboid=function(a){var d=this.g(),h=d.destroy;a=this.cuboidPath(a);d.front=this.path(a[0]).attr({"class":"highcharts-3d-front"}).add(d);d.top=this.path(a[1]).attr({"class":"highcharts-3d-top"}).add(d);
d.side=this.path(a[2]).attr({"class":"highcharts-3d-side"}).add(d);d.fillSetter=function(a){this.front.attr({fill:a});this.top.attr({fill:f(a).brighten(.1).get()});this.side.attr({fill:f(a).brighten(-.1).get()});this.color=a;d.fill=a;return this};d.opacitySetter=function(a){this.front.attr({opacity:a});this.top.attr({opacity:a});this.side.attr({opacity:a});return this};d.attr=function(a,d,h,b){if("string"===typeof a&&"undefined"!==typeof d){var e=a;a={};a[e]=d}if(a.shapeArgs||y(a.x))a=this.renderer.cuboidPath(a.shapeArgs||
a),this.front.attr({d:a[0]}),this.top.attr({d:a[1]}),this.side.attr({d:a[2]});else return c.prototype.attr.call(this,a,void 0,h,b);return this};d.animate=function(a,d,h){y(a.x)&&y(a.y)?(a=this.renderer.cuboidPath(a),this.front.animate({d:a[0]},d,h),this.top.animate({d:a[1]},d,h),this.side.animate({d:a[2]},d,h),this.attr({zIndex:-a[3]})):a.opacity?(this.front.animate(a,d,h),this.top.animate(a,d,h),this.side.animate(a,d,h)):c.prototype.animate.call(this,a,d,h);return this};d.destroy=function(){this.front.destroy();
this.top.destroy();this.side.destroy();return h.call(this)};d.attr({zIndex:-a[3]});return d};b.SVGRenderer.prototype.cuboidPath=function(a){function d(a){return u[a]}var c=a.x,g=a.y,k=a.z,q=a.height,r=a.width,t=a.depth,w=x[this.chartIndex],l,f,n=w.options.chart.options3d.alpha,v=0,u=[{x:c,y:g,z:k},{x:c+r,y:g,z:k},{x:c+r,y:g+q,z:k},{x:c,y:g+q,z:k},{x:c,y:g+q,z:k+t},{x:c+r,y:g+q,z:k+t},{x:c+r,y:g,z:k+t},{x:c,y:g,z:k+t}],u=m(u,w,a.insidePlotArea);f=function(a,c){var h=[[],-1];a=e(a,d);c=e(c,d);0>b.shapeArea(a)?
h=[a,0]:0>b.shapeArea(c)&&(h=[c,1]);return h};l=f([3,2,1,0],[7,6,5,4]);a=l[0];r=l[1];l=f([1,6,7,0],[4,5,2,3]);q=l[0];t=l[1];l=f([1,2,5,6],[0,7,4,3]);f=l[0];l=l[1];1===l?v+=1E4*(1E3-c):l||(v+=1E4*c);v+=10*(!t||0<=n&&180>=n||360>n&&357.5<n?w.plotHeight-g:10+g);1===r?v+=100*k:r||(v+=100*(1E3-k));v=-Math.round(v);return[this.toLinePath(a,!0),this.toLinePath(q,!0),this.toLinePath(f,!0),v]};b.SVGRenderer.prototype.arc3d=function(b){function e(d){var c=!1,h={};d=g(d);for(var b in d)-1!==a(b,l)&&(h[b]=d[b],
delete d[b],c=!0);return c?h:!1}var h=this.g(),z=h.renderer,l="x y r innerR start end".split(" ");b=g(b);b.alpha*=u;b.beta*=u;h.top=z.path();h.side1=z.path();h.side2=z.path();h.inn=z.path();h.out=z.path();h.onAdd=function(){var a=h.parentGroup,d=h.attr("class");h.top.add(h);r(["out","inn","side1","side2"],function(c){h[c].attr({"class":d+" highcharts-3d-side"}).add(a)})};r(["addClass","removeClass"],function(a){h[a]=function(){var d=arguments;r(["top","out","inn","side1","side2"],function(c){h[c][a].apply(h[c],
d)})}});h.setPaths=function(a){var d=h.renderer.arc3dPath(a),c=100*d.zTop;h.attribs=a;h.top.attr({d:d.top,zIndex:d.zTop});h.inn.attr({d:d.inn,zIndex:d.zInn});h.out.attr({d:d.out,zIndex:d.zOut});h.side1.attr({d:d.side1,zIndex:d.zSide1});h.side2.attr({d:d.side2,zIndex:d.zSide2});h.zIndex=c;h.attr({zIndex:c});a.center&&(h.top.setRadialReference(a.center),delete a.center)};h.setPaths(b);h.fillSetter=function(a){var d=f(a).brighten(-.1).get();this.fill=a;this.side1.attr({fill:d});this.side2.attr({fill:d});
this.inn.attr({fill:d});this.out.attr({fill:d});this.top.attr({fill:a});return this};r(["opacity","translateX","translateY","visibility"],function(a){h[a+"Setter"]=function(a,d){h[d]=a;r(["out","inn","side1","side2","top"],function(c){h[c].attr(d,a)})}});q(h,"attr",function(a,d){var c;"object"===typeof d&&(c=e(d))&&(k(h.attribs,c),h.setPaths(h.attribs));return a.apply(this,[].slice.call(arguments,1))});q(h,"animate",function(a,c,b,k){var q,z=this.attribs,r;delete c.center;delete c.z;delete c.depth;
delete c.alpha;delete c.beta;r=A(d(b,this.renderer.globalAnimation));r.duration&&(q=e(c),c.dummy=h.dummy++,q&&(r.step=function(a,c){function h(a){return z[a]+(d(q[a],z[a])-z[a])*c.pos}"dummy"===c.prop&&c.elem.setPaths(g(z,{x:h("x"),y:h("y"),r:h("r"),innerR:h("innerR"),start:h("start"),end:h("end")}))}),b=r);return a.call(this,c,b,k)});h.dummy=0;h.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();c.prototype.destroy.call(this)};h.hide=
function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};h.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};return h};l.prototype.arc3dPath=function(a){function d(a){a%=2*Math.PI;a>Math.PI&&(a=2*Math.PI-a);return a}var c=a.x,b=a.y,e=a.start,g=a.end-.00001,k=a.r,q=a.innerR,r=a.depth,l=a.alpha,m=a.beta,t=Math.cos(e),w=Math.sin(e);a=Math.cos(g);var f=Math.sin(g),x=k*Math.cos(m),k=k*Math.cos(l),u=q*Math.cos(m),
y=q*Math.cos(l),q=r*Math.sin(m),A=r*Math.sin(l),r=["M",c+x*t,b+k*w],r=r.concat(p(c,b,x,k,e,g,0,0)),r=r.concat(["L",c+u*a,b+y*f]),r=r.concat(p(c,b,u,y,g,e,0,0)),r=r.concat(["Z"]),C=0<m?Math.PI/2:0,m=0<l?0:Math.PI/2,C=e>-C?e:g>-C?-C:e,D=g<n-m?g:e<n-m?n-m:g,E=2*n-m,l=["M",c+x*B(C),b+k*v(C)],l=l.concat(p(c,b,x,k,C,D,0,0));g>E&&e<E?(l=l.concat(["L",c+x*B(D)+q,b+k*v(D)+A]),l=l.concat(p(c,b,x,k,D,E,q,A)),l=l.concat(["L",c+x*B(E),b+k*v(E)]),l=l.concat(p(c,b,x,k,E,g,0,0)),l=l.concat(["L",c+x*B(g)+q,b+k*v(g)+
A]),l=l.concat(p(c,b,x,k,g,E,q,A)),l=l.concat(["L",c+x*B(E),b+k*v(E)]),l=l.concat(p(c,b,x,k,E,D,0,0))):g>n-m&&e<n-m&&(l=l.concat(["L",c+x*Math.cos(D)+q,b+k*Math.sin(D)+A]),l=l.concat(p(c,b,x,k,D,g,q,A)),l=l.concat(["L",c+x*Math.cos(g),b+k*Math.sin(g)]),l=l.concat(p(c,b,x,k,g,D,0,0)));l=l.concat(["L",c+x*Math.cos(D)+q,b+k*Math.sin(D)+A]);l=l.concat(p(c,b,x,k,D,C,q,A));l=l.concat(["Z"]);m=["M",c+u*t,b+y*w];m=m.concat(p(c,b,u,y,e,g,0,0));m=m.concat(["L",c+u*Math.cos(g)+q,b+y*Math.sin(g)+A]);m=m.concat(p(c,
b,u,y,g,e,q,A));m=m.concat(["Z"]);t=["M",c+x*t,b+k*w,"L",c+x*t+q,b+k*w+A,"L",c+u*t+q,b+y*w+A,"L",c+u*t,b+y*w,"Z"];c=["M",c+x*a,b+k*f,"L",c+x*a+q,b+k*f+A,"L",c+u*a+q,b+y*f+A,"L",c+u*a,b+y*f,"Z"];f=Math.atan2(A,-q);b=Math.abs(g+f);a=Math.abs(e+f);e=Math.abs((e+g)/2+f);b=d(b);a=d(a);e=d(e);e*=1E5;g=1E5*a;b*=1E5;return{top:r,zTop:1E5*Math.PI+1,out:l,zOut:Math.max(e,g,b),inn:m,zInn:Math.max(e,g,b),side1:t,zSide1:.99*b,side2:c,zSide2:.99*g}}})(C);(function(b){function p(b,k){var a=b.plotLeft,e=b.plotWidth+
a,g=b.plotTop,m=b.plotHeight+g,d=a+b.plotWidth/2,c=g+b.plotHeight/2,l=Number.MAX_VALUE,q=-Number.MAX_VALUE,r=Number.MAX_VALUE,w=-Number.MAX_VALUE,f,h=1;f=[{x:a,y:g,z:0},{x:a,y:g,z:k}];v([0,1],function(a){f.push({x:e,y:f[a].y,z:f[a].z})});v([0,1,2,3],function(a){f.push({x:f[a].x,y:m,z:f[a].z})});f=x(f,b,!1);v(f,function(a){l=Math.min(l,a.x);q=Math.max(q,a.x);r=Math.min(r,a.y);w=Math.max(w,a.y)});a>l&&(h=Math.min(h,1-Math.abs((a+d)/(l+d))%1));e<q&&(h=Math.min(h,(e-d)/(q-d)));g>r&&(h=0>r?Math.min(h,
(g+c)/(-r+g+c)):Math.min(h,1-(g+c)/(r+c)%1));m<w&&(h=Math.min(h,Math.abs((m-c)/(w-c))));return h}var B=b.addEvent,n=b.Chart,v=b.each,A=b.merge,x=b.perspective,f=b.pick,y=b.wrap;n.prototype.is3d=function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};n.prototype.propsRequireDirtyBox.push("chart.options3d");n.prototype.propsRequireUpdateSeries.push("chart.options3d");B(n,"afterInit",function(){var b=this.options;this.is3d()&&v(b.series,function(k){"scatter"===(k.type||
b.chart.type||b.chart.defaultSeriesType)&&(k.type="scatter3d")})});b.wrap(b.Chart.prototype,"isInsidePlot",function(b){return this.is3d()||b.apply(this,[].slice.call(arguments,1))});var u=b.getOptions();A(!0,u,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,axisLabelPosition:"default",frame:{visible:"default",size:1,bottom:{},top:{},left:{},right:{},back:{},front:{}}}}});B(n,"afterGetContainer",function(){this.renderer.definition({tagName:"style",textContent:".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n"})});
y(n.prototype,"setClassName",function(b){b.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});B(b.Chart,"afterSetChartSize",function(){var b=this.options.chart.options3d;if(this.is3d()){var k=this.inverted,a=this.clipBox,e=this.margin;a[k?"y":"x"]=-(e[3]||0);a[k?"x":"y"]=-(e[0]||0);a[k?"height":"width"]=this.chartWidth+(e[3]||0)+(e[1]||0);a[k?"width":"height"]=this.chartHeight+(e[0]||0)+(e[2]||0);this.scale3d=1;!0===b.fitToPlot&&(this.scale3d=
p(this,b.depth));this.frame3d=this.get3dFrame()}});B(n,"beforeRedraw",function(){this.is3d()&&(this.isDirtyBox=!0)});B(n,"beforeRender",function(){this.is3d()&&(this.frame3d=this.get3dFrame())});y(n.prototype,"renderSeries",function(b){var k=this.series.length;if(this.is3d())for(;k--;)b=this.series[k],b.translate(),b.render();else b.call(this)});B(n,"afterDrawChartBox",function(){if(this.is3d()){var r=this.renderer,k=this.options.chart.options3d,a=this.get3dFrame(),e=this.plotLeft,g=this.plotLeft+
this.plotWidth,m=this.plotTop,d=this.plotTop+this.plotHeight,k=k.depth,c=e-(a.left.visible?a.left.size:0),l=g+(a.right.visible?a.right.size:0),q=m-(a.top.visible?a.top.size:0),t=d+(a.bottom.visible?a.bottom.size:0),w=0-(a.front.visible?a.front.size:0),f=k+(a.back.visible?a.back.size:0),h=this.hasRendered?"animate":"attr";this.frame3d=a;this.frameShapes||(this.frameShapes={bottom:r.polyhedron().add(),top:r.polyhedron().add(),left:r.polyhedron().add(),right:r.polyhedron().add(),back:r.polyhedron().add(),
front:r.polyhedron().add()});this.frameShapes.bottom[h]({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:a.bottom.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:c,y:t,z:w},{x:l,y:t,z:w},{x:l,y:t,z:f},{x:c,y:t,z:f}],enabled:a.bottom.visible},{fill:b.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:e,y:d,z:k},{x:g,y:d,z:k},{x:g,y:d,z:0},{x:e,y:d,z:0}],enabled:a.bottom.visible},{fill:b.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:c,
y:t,z:w},{x:c,y:t,z:f},{x:e,y:d,z:k},{x:e,y:d,z:0}],enabled:a.bottom.visible&&!a.left.visible},{fill:b.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:l,y:t,z:f},{x:l,y:t,z:w},{x:g,y:d,z:0},{x:g,y:d,z:k}],enabled:a.bottom.visible&&!a.right.visible},{fill:b.color(a.bottom.color).get(),vertexes:[{x:l,y:t,z:w},{x:c,y:t,z:w},{x:e,y:d,z:0},{x:g,y:d,z:0}],enabled:a.bottom.visible&&!a.front.visible},{fill:b.color(a.bottom.color).get(),vertexes:[{x:c,y:t,z:f},{x:l,y:t,z:f},{x:g,y:d,z:k},{x:e,y:d,z:k}],
enabled:a.bottom.visible&&!a.back.visible}]});this.frameShapes.top[h]({"class":"highcharts-3d-frame highcharts-3d-frame-top",zIndex:a.top.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.top.color).brighten(.1).get(),vertexes:[{x:c,y:q,z:f},{x:l,y:q,z:f},{x:l,y:q,z:w},{x:c,y:q,z:w}],enabled:a.top.visible},{fill:b.color(a.top.color).brighten(.1).get(),vertexes:[{x:e,y:m,z:0},{x:g,y:m,z:0},{x:g,y:m,z:k},{x:e,y:m,z:k}],enabled:a.top.visible},{fill:b.color(a.top.color).brighten(-.1).get(),vertexes:[{x:c,y:q,
z:f},{x:c,y:q,z:w},{x:e,y:m,z:0},{x:e,y:m,z:k}],enabled:a.top.visible&&!a.left.visible},{fill:b.color(a.top.color).brighten(-.1).get(),vertexes:[{x:l,y:q,z:w},{x:l,y:q,z:f},{x:g,y:m,z:k},{x:g,y:m,z:0}],enabled:a.top.visible&&!a.right.visible},{fill:b.color(a.top.color).get(),vertexes:[{x:c,y:q,z:w},{x:l,y:q,z:w},{x:g,y:m,z:0},{x:e,y:m,z:0}],enabled:a.top.visible&&!a.front.visible},{fill:b.color(a.top.color).get(),vertexes:[{x:l,y:q,z:f},{x:c,y:q,z:f},{x:e,y:m,z:k},{x:g,y:m,z:k}],enabled:a.top.visible&&
!a.back.visible}]});this.frameShapes.left[h]({"class":"highcharts-3d-frame highcharts-3d-frame-left",zIndex:a.left.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.left.color).brighten(.1).get(),vertexes:[{x:c,y:t,z:w},{x:e,y:d,z:0},{x:e,y:d,z:k},{x:c,y:t,z:f}],enabled:a.left.visible&&!a.bottom.visible},{fill:b.color(a.left.color).brighten(.1).get(),vertexes:[{x:c,y:q,z:f},{x:e,y:m,z:k},{x:e,y:m,z:0},{x:c,y:q,z:w}],enabled:a.left.visible&&!a.top.visible},{fill:b.color(a.left.color).brighten(-.1).get(),
vertexes:[{x:c,y:t,z:f},{x:c,y:q,z:f},{x:c,y:q,z:w},{x:c,y:t,z:w}],enabled:a.left.visible},{fill:b.color(a.left.color).brighten(-.1).get(),vertexes:[{x:e,y:m,z:k},{x:e,y:d,z:k},{x:e,y:d,z:0},{x:e,y:m,z:0}],enabled:a.left.visible},{fill:b.color(a.left.color).get(),vertexes:[{x:c,y:t,z:w},{x:c,y:q,z:w},{x:e,y:m,z:0},{x:e,y:d,z:0}],enabled:a.left.visible&&!a.front.visible},{fill:b.color(a.left.color).get(),vertexes:[{x:c,y:q,z:f},{x:c,y:t,z:f},{x:e,y:d,z:k},{x:e,y:m,z:k}],enabled:a.left.visible&&!a.back.visible}]});
this.frameShapes.right[h]({"class":"highcharts-3d-frame highcharts-3d-frame-right",zIndex:a.right.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.right.color).brighten(.1).get(),vertexes:[{x:l,y:t,z:f},{x:g,y:d,z:k},{x:g,y:d,z:0},{x:l,y:t,z:w}],enabled:a.right.visible&&!a.bottom.visible},{fill:b.color(a.right.color).brighten(.1).get(),vertexes:[{x:l,y:q,z:w},{x:g,y:m,z:0},{x:g,y:m,z:k},{x:l,y:q,z:f}],enabled:a.right.visible&&!a.top.visible},{fill:b.color(a.right.color).brighten(-.1).get(),vertexes:[{x:g,
y:m,z:0},{x:g,y:d,z:0},{x:g,y:d,z:k},{x:g,y:m,z:k}],enabled:a.right.visible},{fill:b.color(a.right.color).brighten(-.1).get(),vertexes:[{x:l,y:t,z:w},{x:l,y:q,z:w},{x:l,y:q,z:f},{x:l,y:t,z:f}],enabled:a.right.visible},{fill:b.color(a.right.color).get(),vertexes:[{x:l,y:q,z:w},{x:l,y:t,z:w},{x:g,y:d,z:0},{x:g,y:m,z:0}],enabled:a.right.visible&&!a.front.visible},{fill:b.color(a.right.color).get(),vertexes:[{x:l,y:t,z:f},{x:l,y:q,z:f},{x:g,y:m,z:k},{x:g,y:d,z:k}],enabled:a.right.visible&&!a.back.visible}]});
this.frameShapes.back[h]({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:a.back.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.back.color).brighten(.1).get(),vertexes:[{x:l,y:t,z:f},{x:c,y:t,z:f},{x:e,y:d,z:k},{x:g,y:d,z:k}],enabled:a.back.visible&&!a.bottom.visible},{fill:b.color(a.back.color).brighten(.1).get(),vertexes:[{x:c,y:q,z:f},{x:l,y:q,z:f},{x:g,y:m,z:k},{x:e,y:m,z:k}],enabled:a.back.visible&&!a.top.visible},{fill:b.color(a.back.color).brighten(-.1).get(),vertexes:[{x:c,y:t,
z:f},{x:c,y:q,z:f},{x:e,y:m,z:k},{x:e,y:d,z:k}],enabled:a.back.visible&&!a.left.visible},{fill:b.color(a.back.color).brighten(-.1).get(),vertexes:[{x:l,y:q,z:f},{x:l,y:t,z:f},{x:g,y:d,z:k},{x:g,y:m,z:k}],enabled:a.back.visible&&!a.right.visible},{fill:b.color(a.back.color).get(),vertexes:[{x:e,y:m,z:k},{x:g,y:m,z:k},{x:g,y:d,z:k},{x:e,y:d,z:k}],enabled:a.back.visible},{fill:b.color(a.back.color).get(),vertexes:[{x:c,y:t,z:f},{x:l,y:t,z:f},{x:l,y:q,z:f},{x:c,y:q,z:f}],enabled:a.back.visible}]});this.frameShapes.front[h]({"class":"highcharts-3d-frame highcharts-3d-frame-front",
zIndex:a.front.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.front.color).brighten(.1).get(),vertexes:[{x:c,y:t,z:w},{x:l,y:t,z:w},{x:g,y:d,z:0},{x:e,y:d,z:0}],enabled:a.front.visible&&!a.bottom.visible},{fill:b.color(a.front.color).brighten(.1).get(),vertexes:[{x:l,y:q,z:w},{x:c,y:q,z:w},{x:e,y:m,z:0},{x:g,y:m,z:0}],enabled:a.front.visible&&!a.top.visible},{fill:b.color(a.front.color).brighten(-.1).get(),vertexes:[{x:c,y:q,z:w},{x:c,y:t,z:w},{x:e,y:d,z:0},{x:e,y:m,z:0}],enabled:a.front.visible&&!a.left.visible},
{fill:b.color(a.front.color).brighten(-.1).get(),vertexes:[{x:l,y:t,z:w},{x:l,y:q,z:w},{x:g,y:m,z:0},{x:g,y:d,z:0}],enabled:a.front.visible&&!a.right.visible},{fill:b.color(a.front.color).get(),vertexes:[{x:g,y:m,z:0},{x:e,y:m,z:0},{x:e,y:d,z:0},{x:g,y:d,z:0}],enabled:a.front.visible},{fill:b.color(a.front.color).get(),vertexes:[{x:l,y:t,z:w},{x:c,y:t,z:w},{x:c,y:q,z:w},{x:l,y:q,z:w}],enabled:a.front.visible}]})}});n.prototype.retrieveStacks=function(b){var k=this.series,a={},e,g=1;v(this.series,
function(m){e=f(m.options.stack,b?0:k.length-1-m.index);a[e]?a[e].series.push(m):(a[e]={series:[m],position:g},g++)});a.totalStacks=g+1;return a};n.prototype.get3dFrame=function(){var r=this,k=r.options.chart.options3d,a=k.frame,e=r.plotLeft,g=r.plotLeft+r.plotWidth,m=r.plotTop,d=r.plotTop+r.plotHeight,c=k.depth,l=function(a){a=b.shapeArea3d(a,r);return.5<a?1:-.5>a?-1:0},q=l([{x:e,y:d,z:c},{x:g,y:d,z:c},{x:g,y:d,z:0},{x:e,y:d,z:0}]),t=l([{x:e,y:m,z:0},{x:g,y:m,z:0},{x:g,y:m,z:c},{x:e,y:m,z:c}]),w=
l([{x:e,y:m,z:0},{x:e,y:m,z:c},{x:e,y:d,z:c},{x:e,y:d,z:0}]),n=l([{x:g,y:m,z:c},{x:g,y:m,z:0},{x:g,y:d,z:0},{x:g,y:d,z:c}]),h=l([{x:e,y:d,z:0},{x:g,y:d,z:0},{x:g,y:m,z:0},{x:e,y:m,z:0}]),l=l([{x:e,y:m,z:c},{x:g,y:m,z:c},{x:g,y:d,z:c},{x:e,y:d,z:c}]),z=!1,u=!1,A=!1,y=!1;v([].concat(r.xAxis,r.yAxis,r.zAxis),function(a){a&&(a.horiz?a.opposite?u=!0:z=!0:a.opposite?y=!0:A=!0)});var p=function(a,c,d){for(var b=["size","color","visible"],e={},g=0;g<b.length;g++)for(var h=b[g],k=0;k<a.length;k++)if("object"===
typeof a[k]){var l=a[k][h];if(void 0!==l&&null!==l){e[h]=l;break}}a=d;!0===e.visible||!1===e.visible?a=e.visible:"auto"===e.visible&&(a=0<c);return{size:f(e.size,1),color:f(e.color,"none"),frontFacing:0<c,visible:a}},a={bottom:p([a.bottom,a.top,a],q,z),top:p([a.top,a.bottom,a],t,u),left:p([a.left,a.right,a.side,a],w,A),right:p([a.right,a.left,a.side,a],n,y),back:p([a.back,a.front,a],l,!0),front:p([a.front,a.back,a],h,!1)};"auto"===k.axisLabelPosition?(n=function(a,c){return a.visible!==c.visible||
a.visible&&c.visible&&a.frontFacing!==c.frontFacing},k=[],n(a.left,a.front)&&k.push({y:(m+d)/2,x:e,z:0,xDir:{x:1,y:0,z:0}}),n(a.left,a.back)&&k.push({y:(m+d)/2,x:e,z:c,xDir:{x:0,y:0,z:-1}}),n(a.right,a.front)&&k.push({y:(m+d)/2,x:g,z:0,xDir:{x:0,y:0,z:1}}),n(a.right,a.back)&&k.push({y:(m+d)/2,x:g,z:c,xDir:{x:-1,y:0,z:0}}),q=[],n(a.bottom,a.front)&&q.push({x:(e+g)/2,y:d,z:0,xDir:{x:1,y:0,z:0}}),n(a.bottom,a.back)&&q.push({x:(e+g)/2,y:d,z:c,xDir:{x:-1,y:0,z:0}}),t=[],n(a.top,a.front)&&t.push({x:(e+
g)/2,y:m,z:0,xDir:{x:1,y:0,z:0}}),n(a.top,a.back)&&t.push({x:(e+g)/2,y:m,z:c,xDir:{x:-1,y:0,z:0}}),w=[],n(a.bottom,a.left)&&w.push({z:(0+c)/2,y:d,x:e,xDir:{x:0,y:0,z:-1}}),n(a.bottom,a.right)&&w.push({z:(0+c)/2,y:d,x:g,xDir:{x:0,y:0,z:1}}),d=[],n(a.top,a.left)&&d.push({z:(0+c)/2,y:m,x:e,xDir:{x:0,y:0,z:-1}}),n(a.top,a.right)&&d.push({z:(0+c)/2,y:m,x:g,xDir:{x:0,y:0,z:1}}),e=function(a,c,d){if(0===a.length)return null;if(1===a.length)return a[0];for(var b=0,e=x(a,r,!1),g=1;g<e.length;g++)d*e[g][c]>
d*e[b][c]?b=g:d*e[g][c]===d*e[b][c]&&e[g].z<e[b].z&&(b=g);return a[b]},a.axes={y:{left:e(k,"x",-1),right:e(k,"x",1)},x:{top:e(t,"y",-1),bottom:e(q,"y",1)},z:{top:e(d,"y",-1),bottom:e(w,"y",1)}}):a.axes={y:{left:{x:e,z:0,xDir:{x:1,y:0,z:0}},right:{x:g,z:0,xDir:{x:0,y:0,z:1}}},x:{top:{y:m,z:0,xDir:{x:1,y:0,z:0}},bottom:{y:d,z:0,xDir:{x:1,y:0,z:0}}},z:{top:{x:A?g:e,y:m,xDir:A?{x:0,y:0,z:1}:{x:0,y:0,z:-1}},bottom:{x:A?g:e,y:d,xDir:A?{x:0,y:0,z:1}:{x:0,y:0,z:-1}}}};return a};b.Fx.prototype.matrixSetter=
function(){var f;if(1>this.pos&&(b.isArray(this.start)||b.isArray(this.end))){var k=this.start||[1,0,0,1,0,0],a=this.end||[1,0,0,1,0,0];f=[];for(var e=0;6>e;e++)f.push(this.pos*a[e]+(1-this.pos)*k[e])}else f=this.end;this.elem.attr(this.prop,f,null,!0)}})(C);(function(b){function p(d,c,b){if(!d.chart.is3d()||"colorAxis"===d.coll)return c;var e=d.chart,g=x*e.options.chart.options3d.alpha,l=x*e.options.chart.options3d.beta,m=k(b&&d.options.title.position3d,d.options.labels.position3d);b=k(b&&d.options.title.skew3d,
d.options.labels.skew3d);var h=e.frame3d,f=e.plotLeft,n=e.plotWidth+f,v=e.plotTop,A=e.plotHeight+v,e=!1,u=0,y=0,p={x:0,y:1,z:0};c=d.swapZ({x:c.x,y:c.y,z:0});if(d.isZAxis)if(d.opposite){if(null===h.axes.z.top)return{};y=c.y-v;c.x=h.axes.z.top.x;c.y=h.axes.z.top.y;f=h.axes.z.top.xDir;e=!h.top.frontFacing}else{if(null===h.axes.z.bottom)return{};y=c.y-A;c.x=h.axes.z.bottom.x;c.y=h.axes.z.bottom.y;f=h.axes.z.bottom.xDir;e=!h.bottom.frontFacing}else if(d.horiz)if(d.opposite){if(null===h.axes.x.top)return{};
y=c.y-v;c.y=h.axes.x.top.y;c.z=h.axes.x.top.z;f=h.axes.x.top.xDir;e=!h.top.frontFacing}else{if(null===h.axes.x.bottom)return{};y=c.y-A;c.y=h.axes.x.bottom.y;c.z=h.axes.x.bottom.z;f=h.axes.x.bottom.xDir;e=!h.bottom.frontFacing}else if(d.opposite){if(null===h.axes.y.right)return{};u=c.x-n;c.x=h.axes.y.right.x;c.z=h.axes.y.right.z;f=h.axes.y.right.xDir;f={x:f.z,y:f.y,z:-f.x}}else{if(null===h.axes.y.left)return{};u=c.x-f;c.x=h.axes.y.left.x;c.z=h.axes.y.left.z;f=h.axes.y.left.xDir}"chart"!==m&&("flap"===
m?d.horiz?(l=Math.sin(g),g=Math.cos(g),d.opposite&&(l=-l),e&&(l=-l),p={x:f.z*l,y:g,z:-f.x*l}):f={x:Math.cos(l),y:0,z:Math.sin(l)}:"ortho"===m?d.horiz?(p=Math.cos(g),m=Math.sin(l)*p,g=-Math.sin(g),l=-p*Math.cos(l),p={x:f.y*l-f.z*g,y:f.z*m-f.x*l,z:f.x*g-f.y*m},g=1/Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z),e&&(g=-g),p={x:g*p.x,y:g*p.y,z:g*p.z}):f={x:Math.cos(l),y:0,z:Math.sin(l)}:d.horiz?p={x:Math.sin(l)*Math.sin(g),y:Math.cos(g),z:-Math.cos(l)*Math.sin(g)}:f={x:Math.cos(l),y:0,z:Math.sin(l)});c.x+=u*f.x+y*
p.x;c.y+=u*f.y+y*p.y;c.z+=u*f.z+y*p.z;e=r([c],d.chart)[0];b?(0>a(r([c,{x:c.x+f.x,y:c.y+f.y,z:c.z+f.z},{x:c.x+p.x,y:c.y+p.y,z:c.z+p.z}],d.chart))&&(f={x:-f.x,y:-f.y,z:-f.z}),d=r([{x:c.x,y:c.y,z:c.z},{x:c.x+f.x,y:c.y+f.y,z:c.z+f.z},{x:c.x+p.x,y:c.y+p.y,z:c.z+p.z}],d.chart),e.matrix=[d[1].x-d[0].x,d[1].y-d[0].y,d[2].x-d[0].x,d[2].y-d[0].y,e.x,e.y],e.matrix[4]-=e.x*e.matrix[0]+e.y*e.matrix[2],e.matrix[5]-=e.x*e.matrix[1]+e.y*e.matrix[3]):e.matrix=null;return e}var B,n=b.addEvent,v=b.Axis,A=b.Chart,x=
b.deg2rad,f=b.each,y=b.extend,u=b.merge,r=b.perspective,k=b.pick,a=b.shapeArea,e=b.splat,g=b.Tick,m=b.wrap;u(!0,v.prototype.defaultOptions,{labels:{position3d:"offset",skew3d:!1},title:{position3d:null,skew3d:null}});n(v,"afterSetOptions",function(){var a;this.chart.is3d&&this.chart.is3d()&&"colorAxis"!==this.coll&&(a=this.options,a.tickWidth=k(a.tickWidth,0),a.gridLineWidth=k(a.gridLineWidth,1))});m(v.prototype,"getPlotLinePath",function(a){var c=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||
"colorAxis"===this.coll||null===c)return c;var d=this.chart,b=d.options.chart.options3d,b=this.isZAxis?d.plotWidth:b.depth,d=d.frame3d,c=[this.swapZ({x:c[1],y:c[2],z:0}),this.swapZ({x:c[1],y:c[2],z:b}),this.swapZ({x:c[4],y:c[5],z:0}),this.swapZ({x:c[4],y:c[5],z:b})],b=[];this.horiz?(this.isZAxis?(d.left.visible&&b.push(c[0],c[2]),d.right.visible&&b.push(c[1],c[3])):(d.front.visible&&b.push(c[0],c[2]),d.back.visible&&b.push(c[1],c[3])),d.top.visible&&b.push(c[0],c[1]),d.bottom.visible&&b.push(c[2],
c[3])):(d.front.visible&&b.push(c[0],c[2]),d.back.visible&&b.push(c[1],c[3]),d.left.visible&&b.push(c[0],c[1]),d.right.visible&&b.push(c[2],c[3]));b=r(b,this.chart,!1);return this.chart.renderer.toLineSegments(b)});m(v.prototype,"getLinePath",function(a){return this.chart.is3d()&&"colorAxis"!==this.coll?[]:a.apply(this,[].slice.call(arguments,1))});m(v.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d()||"colorAxis"===this.coll)return a.apply(this,[].slice.call(arguments,1));var c=arguments,
b=c[2],d=[],c=this.getPlotLinePath(c[1]),b=this.getPlotLinePath(b);if(c&&b)for(var e=0;e<c.length;e+=6)d.push("M",c[e+1],c[e+2],"L",c[e+4],c[e+5],"L",b[e+4],b[e+5],"L",b[e+1],b[e+2],"Z");return d});m(g.prototype,"getMarkPath",function(a){var c=a.apply(this,[].slice.call(arguments,1)),c=[p(this.axis,{x:c[1],y:c[2],z:0}),p(this.axis,{x:c[4],y:c[5],z:0})];return this.axis.chart.renderer.toLineSegments(c)});n(g,"afterGetLabelPosition",function(a){y(a.pos,p(this.axis,a.pos))});m(v.prototype,"getTitlePosition",
function(a){var c=a.apply(this,[].slice.call(arguments,1));return p(this,c,!0)});n(v,"drawCrosshair",function(a){this.chart.is3d()&&"colorAxis"!==this.coll&&a.point&&(a.point.crosshairPos=this.isXAxis?a.point.plotXold||a.point.plotX:this.len-(a.point.plotYold||a.point.plotY))});n(v,"destroy",function(){f(["backFrame","bottomFrame","sideFrame"],function(a){this[a]&&(this[a]=this[a].destroy())},this)});v.prototype.swapZ=function(a,c){return this.isZAxis?(c=c?0:this.chart.plotLeft,{x:c+a.z,y:a.y,z:a.x-
c}):a};B=b.ZAxis=function(){this.init.apply(this,arguments)};y(B.prototype,v.prototype);y(B.prototype,{isZAxis:!0,setOptions:function(a){a=u({offset:0,lineWidth:0},a);v.prototype.setOptions.call(this,a);this.coll="zAxis"},setAxisSize:function(){v.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=this,c=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=
a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();f(a.series,function(b){if(b.visible||!c.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=!0,b=b.zData,b.length&&(a.dataMin=Math.min(k(a.dataMin,b[0]),Math.min.apply(null,b)),a.dataMax=Math.max(k(a.dataMax,b[0]),Math.max.apply(null,b)))})}});n(A,"afterGetAxes",function(){var a=this,b=this.options,b=b.zAxis=e(b.zAxis||{});a.is3d()&&(this.zAxis=[],f(b,function(b,c){b.index=c;b.isX=!0;(new B(a,b)).setScale()}))})})(C);(function(b){var p=b.addEvent,
B=b.perspective,n=b.pick;p(b.Series,"afterTranslate",function(){this.chart.is3d()&&this.translate3dPoints()});b.Series.prototype.translate3dPoints=function(){var b=this.chart,p=n(this.zAxis,b.options.zAxis[0]),x=[],f,y,u;for(u=0;u<this.data.length;u++)f=this.data[u],p&&p.translate?(y=p.isLog&&p.val2lin?p.val2lin(f.z):f.z,f.plotZ=p.translate(y),f.isInside=f.isInside?y>=p.min&&y<=p.max:!1):f.plotZ=0,x.push({x:n(f.plotXold,f.plotX),y:n(f.plotYold,f.plotY),z:n(f.plotZold,f.plotZ)});b=B(x,b,!0);for(u=
0;u<this.data.length;u++)f=this.data[u],p=b[u],f.plotXold=f.plotX,f.plotYold=f.plotY,f.plotZold=f.plotZ,f.plotX=p.x,f.plotY=p.y,f.plotZ=p.z}})(C);(function(b){var p=b.addEvent,B=b.each,n=b.perspective,v=b.pick,A=b.Series,x=b.seriesTypes,f=b.inArray,y=b.svg,u=b.wrap;u(x.column.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.translate3dShapes()});u(b.Series.prototype,"alignDataLabel",function(b){arguments[3].outside3dPlot=arguments[1].outside3dPlot;
b.apply(this,[].slice.call(arguments,1))});u(b.Series.prototype,"justifyDataLabel",function(b){return arguments[2].outside3dPlot?!1:b.apply(this,[].slice.call(arguments,1))});x.column.prototype.translate3dPoints=function(){};x.column.prototype.translate3dShapes=function(){var b=this,k=b.chart,a=b.options,e=a.depth||25,g=(a.stacking?a.stack||0:b.index)*(e+(a.groupZPadding||1)),f=b.borderWidth%2?.5:0;k.inverted&&!b.yAxis.reversed&&(f*=-1);!1!==a.grouping&&(g=0);g+=a.groupZPadding||1;B(b.data,function(a){a.outside3dPlot=
null;if(null!==a.y){var c=a.shapeArgs,d=a.tooltipPos,m;B([["x","width"],["y","height"]],function(d){m=c[d[0]]-f;0>m&&(c[d[1]]+=c[d[0]]+f,c[d[0]]=-f,m=0);m+c[d[1]]>b[d[0]+"Axis"].len&&0!==c[d[1]]&&(c[d[1]]=b[d[0]+"Axis"].len-c[d[0]]);if(0!==c[d[1]]&&(c[d[0]]>=b[d[0]+"Axis"].len||c[d[0]]+c[d[1]]<=f)){for(var e in c)c[e]=0;a.outside3dPlot=!0}});a.shapeType="cuboid";c.z=g;c.depth=e;c.insidePlotArea=!0;d=n([{x:d[0],y:d[1],z:g}],k,!0)[0];a.tooltipPos=[d.x,d.y]}});b.z=g};u(x.column.prototype,"animate",function(b){if(this.chart.is3d()){var f=
arguments[1],a=this.yAxis,e=this,g=this.yAxis.reversed;y&&(f?B(e.data,function(b){null!==b.y&&(b.height=b.shapeArgs.height,b.shapey=b.shapeArgs.y,b.shapeArgs.height=1,g||(b.shapeArgs.y=b.stackY?b.plotY+a.translate(b.stackY):b.plotY+(b.negative?-b.height:b.height)))}):(B(e.data,function(a){null!==a.y&&(a.shapeArgs.height=a.height,a.shapeArgs.y=a.shapey,a.graphic&&a.graphic.animate(a.shapeArgs,e.options.animation))}),this.drawDataLabels(),e.animate=null))}else b.apply(this,[].slice.call(arguments,1))});
u(x.column.prototype,"plotGroup",function(b,f,a,e,g,m){this.chart.is3d()&&m&&!this[f]&&(this.chart.columnGroup||(this.chart.columnGroup=this.chart.renderer.g("columnGroup").add(m)),this[f]=this.chart.columnGroup,this.chart.columnGroup.attr(this.getPlotBox()),this[f].survive=!0);return b.apply(this,Array.prototype.slice.call(arguments,1))});u(x.column.prototype,"setVisible",function(b,k){var a=this,e;a.chart.is3d()&&B(a.data,function(b){e=(b.visible=b.options.visible=k=void 0===k?!b.visible:k)?"visible":
"hidden";a.options.data[f(b,a.data)]=b.options;b.graphic&&b.graphic.attr({visibility:e})});b.apply(this,Array.prototype.slice.call(arguments,1))});x.column.prototype.handle3dGrouping=!0;p(A,"afterInit",function(){if(this.chart.is3d()&&this.handle3dGrouping){var b=this.options,f=b.grouping,a=b.stacking,e=v(this.yAxis.options.reversedStacks,!0),g=0;if(void 0===f||f){f=this.chart.retrieveStacks(a);g=b.stack||0;for(a=0;a<f[g].series.length&&f[g].series[a]!==this;a++);g=10*(f.totalStacks-f[g].position)+
(e?a:-a);this.xAxis.reversed||(g=10*f.totalStacks-g)}b.zIndex=g}});u(A.prototype,"alignDataLabel",function(b){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var f=arguments,a=f[4],f=f[1],e={x:a.x,y:a.y,z:this.z},e=n([e],this.chart,!0)[0];a.x=e.x;a.y=f.outside3dPlot?-9E9:e.y}b.apply(this,[].slice.call(arguments,1))});u(b.StackItem.prototype,"getStackBox",function(f,k){var a=f.apply(this,[].slice.call(arguments,1));if(k.is3d()){var e={x:a.x,y:a.y,z:0},e=b.perspective([e],k,
!0)[0];a.x=e.x;a.y=e.y}return a})})(C);(function(b){var p=b.deg2rad,B=b.each,n=b.seriesTypes,v=b.svg;b=b.wrap;b(n.pie.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var n=this,f=n.options,v=f.depth||0,u=n.chart.options.chart.options3d,r=u.alpha,k=u.beta,a=f.stacking?(f.stack||0)*v:n._i*v,a=a+v/2;!1!==f.grouping&&(a=0);B(n.data,function(b){var e=b.shapeArgs;b.shapeType="arc3d";e.z=a;e.depth=.75*v;e.alpha=r;e.beta=k;e.center=n.center;e=(e.end+e.start)/
2;b.slicedTranslation={translateX:Math.round(Math.cos(e)*f.slicedOffset*Math.cos(r*p)),translateY:Math.round(Math.sin(e)*f.slicedOffset*Math.cos(r*p))}})}});b(n.pie.prototype.pointClass.prototype,"haloPath",function(b){var n=arguments;return this.series.chart.is3d()?[]:b.call(this,n[1])});b(n.pie.prototype,"drawPoints",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&B(this.points,function(b){var f=b.graphic;if(f)f[b.y&&b.visible?"show":"hide"]()})});b(n.pie.prototype,"drawDataLabels",
function(b){if(this.chart.is3d()){var n=this.chart.options.chart.options3d;B(this.data,function(b){var f=b.shapeArgs,u=f.r,r=(f.start+f.end)/2,k=b.labelPos,a=-u*(1-Math.cos((f.alpha||n.alpha)*p))*Math.sin(r),e=u*(Math.cos((f.beta||n.beta)*p)-1)*Math.cos(r);B([0,2,4],function(b){k[b]+=e;k[b+1]+=a})})}b.apply(this,[].slice.call(arguments,1))});b(n.pie.prototype,"addPoint",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});b(n.pie.prototype,"animate",
function(b){if(this.chart.is3d()){var n=arguments[1],f=this.options.animation,p=this.center,u=this.group,r=this.markerGroup;v&&(!0===f&&(f={}),n?(u.oldtranslateX=u.translateX,u.oldtranslateY=u.translateY,n={translateX:p[0],translateY:p[1],scaleX:.001,scaleY:.001},u.attr(n),r&&(r.attrSetters=u.attrSetters,r.attr(n))):(n={translateX:u.oldtranslateX,translateY:u.oldtranslateY,scaleX:1,scaleY:1},u.animate(n,f),r&&r.animate(n,f),this.animate=null))}else b.apply(this,[].slice.call(arguments,1))})})(C);
(function(b){var p=b.Point,B=b.seriesType,n=b.seriesTypes;B("scatter3d","scatter",{tooltip:{pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"}},{pointAttribs:function(p){var v=n.scatter.prototype.pointAttribs.apply(this,arguments);this.chart.is3d()&&p&&(v.zIndex=b.pointCameraDistance(p,this.chart));return v},axisTypes:["xAxis","yAxis","zAxis"],pointArrayMap:["x","y","z"],parallelArrays:["x","y","z"],directTouch:!0},
{applyOptions:function(){p.prototype.applyOptions.apply(this,arguments);void 0===this.z&&(this.z=0);return this}})})(C)});