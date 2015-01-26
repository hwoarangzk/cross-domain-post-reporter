cross-domain-post-reporter
==========================

A component that can send post request

A pure js function which can send post request.

Import the cross-domain-post-reporter in your page, and then:
<pre>
postReport({
    action: url,
    data: {
      name: 'reporter',
      prop1: ...,
      prop2: ...,
      ...
    }
});
</pre>

Compatible with major browsers. 

No need to worry about the cross domain issue. 

If you don't care the callback of the request, just use it.
