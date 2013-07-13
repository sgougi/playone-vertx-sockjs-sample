(function ($) {
    $.app = {
    	dummyUrl : null,
    	init:function (path, scriptType, dummyUrl) {
    		this.dummyUrl = dummyUrl
			jQuery.browser = {}
			jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase())
			jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase())
			jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase())
			jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase())

			if( (!$.browser.msie) && ( $.browser.webkit || $.browser.mozilla ) ) {
				var init = true, 
				    state = window.history.pushState !== undefined
				var evalScripts = function() {
				     $('#container').find("script").each(function() {
			    		 var type = $(this).attr('type')
				    	 if(type === scriptType) {
				    		eval($(this).text())
				    	 }
				     })		
				}
				var handler = function(data) {
					 $('title').html($('title', data).html())
				     $('#container').html($('#container', data).html())
					 evalScripts()
					 $('#page').show()
				     $.address.title(/>([^<]*)<\/title/.exec(data)[1])
				}
				$.address.tracker(function () {}).crawlable(1).state("").init(function () {
					var nav = $('.anav a, a.anav')					
					nav.address()
				}).change(function (e) {
					if (state && init) {
						init = false
					} else {
						var url = $.address.state() + e.path
						$.ajax({
							dataType: 'html',
							cache: true,
							url: url,
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								handler(XMLHttpRequest.responseText)
							},
							success: function(data, textStatus, XMLHttpRequest) {
								handler(data)
							}
						})
					}
				})
			}
    	},    	
    	getTableRows: function() {
    		var rows = $.cookie('table-rows')
    		if( rows == undefined ) 
    			return 10
    		return rows
    	},
    	setTableRows: function(rows) {
    		$.cookie('table-rows', rows, { path: '/' })
    	},    	
    	moveAddress:function(anchor) {
    		var href
    		if(anchor.attr === undefined)
    			href = anchor
   			else
   				href = anchor.attr('href')   				
			/* move */  {
        		if( (!$.browser.msie) && ( $.browser.webkit || $.browser.mozilla ) ) {
        			$.address.value(href)        			
        		} else {
        			location.href = href
        		}
    		}
    	},
    	notifyError: function(text) {
   		    $('.top-right').notify({
   			  message: { text: text }, type:'danger'
   		    }).show()     		
    		return ''
    	},
    	notifyOk: function(text) {
   		    $('.top-right').notify({
     			  message: { text: text }, type:'success' 
  		    }).show()    		
    		return ''
    	},
    	historyBack: function() {
    		$.ajax({cache: true, url: this.dummyUrl})
    		history.back(-1)
    		return false
    	},
    	convSafeName:function(term) {
    		var wterm = $.trim(term)
    		if(wterm == '') return null
        	if(
        		   wterm == '.'  　　　　　　　　　　　　　　　　　// なぜだめなのかよくわからんが、.一文字は扱えなくてよいだろう。
   				|| wterm.indexOf("{",0) != -1      // これはだめ   				   				
   				|| wterm.indexOf("}",0) != -1      // これはだめ   				   				   				
   				|| wterm.indexOf("\\",0) != -1     // これはだめ   				   				   				   				
       		) {
    			alert('invalid term name : ' + wterm)
    			return null
    		}
        	if(
            	   wterm.indexOf("/",0) != -1
            	|| wterm.indexOf("#",0) != -1
         		|| wterm.indexOf("\\",0) != -1
         		|| wterm.indexOf("?",0) != -1
        		) {
        		var rterm = encodeURIComponent(wterm)
        		console.log(rterm)
     			return rterm
     		}        	
    		return wterm
    	},
    	execPost : function(action, data) {
			var form = document.createElement("form")
			form.setAttribute("action", action)
			form.setAttribute("method", "post")
			form.style.display = "none"
			document.body.appendChild(form)
			if (data !== undefined) {
				for ( var paramName in data) {
					var input = document.createElement('input')
					input.setAttribute('type', 'hidden')
					input.setAttribute('name', paramName)
					input.setAttribute('value', data[paramName])
					form.appendChild(input)
				}
			}
			form.submit()
		}
    }
})(jQuery)

$(function () {
	$(document).ready(function(){
		$.prettyLoader({
			animation_speed: 'fast', /* fast/normal/slow/integer */
			bind_to_ajax: true, /* true/false */
			delay: false, /* false OR time in milliseconds (ms) */
			loader: '/assets/images/prettyLoader/ajax-loader.gif', /* Path to your loader gif */
			offset_top: -14, /* integer */
			offset_left: -14 /* integer */
		})
	})
})