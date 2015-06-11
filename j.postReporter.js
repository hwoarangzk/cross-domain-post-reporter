(function() {

	var data,
		form,
		__formId = '__post_form',
		__iframeName = '__post_iframe',
		isIE = !!(window.ActiveXObject || window.msIsStaticHTML),
		iframe,
		formsList = [],
		iframeList = [],
		global_count = 0,
		MAX_COUNT = 999;

	var cb = function(f, ifr) {
		setTimeout(function() {
			try {

				if (f) {
					document.body.removeChild(f);
				}

				if (ifr) {
					document.body.removeChild(ifr);
				}
			} catch (e) {
				//form and iframe are removed already here
			}
		 }, 1000);
	};

	var preSend = function() {

		var inputEle,
			docFragment = document.createDocumentFragment(),
			form = formsList.shift(),
			ifr = iframeList.shift();
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
    	cb(form, ifr);
       
	};

	window.postReport = function(options) {

		if (!options.action) {
			return;
		}

		var _formId = __formId + global_count,
			_iframeName = __iframeName + global_count;
		global_count++;
		if (global_count > MAX_COUNT) {
			global_count = 0;
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

		formsList.push(form);
		iframeList.push(iframe);

		document.body.appendChild(iframe);
		document.body.appendChild(form);

		setTimeout(function() {
			preSend();
		}, 10);
	};
})();
