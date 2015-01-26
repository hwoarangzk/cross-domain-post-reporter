(function() {

	var data,
		form,
		_formId = '__post_form',
		_iframeName = '__post_iframe',
		isIE = !!(window.ActiveXObject || window.msIsStaticHTML),
		iframe;


	var cb = function() {
		setTimeout(function() {
			try {
				if (cForm) {
					document.body.removeChild(cForm);
				}

				if (cIframe) {
					document.body.removeChild(cIframe);
				}
			} catch (e) {
				//form and iframe are removed already here
			}
		 }, 1000);
	};

	var preSend = function() {

		var inputEle,
			docFragment = document.createDocumentFragment();
		try {//ie
			for (var i in data) {
				inputEle = document.createElement('<input name="' + i + '"/>');
				inputEle.value = data[i];
				inputEle.type = 'hidden';
				docFragment.appendChild(inputEle);
			}
		} catch (e) {//none ie
			for (var i in data) {
				inputEle = document.createElement('input');
				inputEle.type = 'hidden';
				inputEle.name = i;
				inputEle.value = data[i];
				docFragment.appendChild(inputEle);
			}
		}
		form.appendChild(docFragment);
        form.submit();
    	cb();
       
	};

	window.postReport = function(options) {

		if (!options.action) {
			return;
		}

		var cForm = document.getElementById(_formId),
			cIframe = document.getElementById(_iframeName);
			
		if (cForm) {
			document.body.removeChild(cForm);
		}

		if (cIframe) {
			document.body.removeChild(cIframe);
		}

		var action = options.action;
		data = options.data || {};

		try {//ie
			form = document.createElement('<form id="' + _formId + '" method="post" action="' + action + '" target="' + _iframeName + '"></form>');
			iframe = document.createElement('<iframe name="' + _iframeName + '" id="' + _iframeName + '" src="javascript:false;"></iframe>');
		} catch (e) {//none ie
			form = document.createElement('form');
			form.id = _formId;
			form.method = 'post';
			form.action = action;
			form.target = _iframeName;
			iframe = document.createElement('iframe');
			iframe.name = _iframeName;
			iframe.id = _iframeName;
		}

		iframe.style.cssText = 'width:1px;height:0;display:none;';

		document.body.appendChild(iframe);
		document.body.appendChild(form);

		setTimeout(function() {
			preSend();
		}, 10);
	};
	
})();