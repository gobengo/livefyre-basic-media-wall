define(['text!../templates/WallTweet.html',
        'mustache',
        'jquery'
],
function (WallTweetTemplate, Mustache, $) {
	var tweetIconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAEJGlDQ1BJQ0MgUHJvZmlsZQAAOBGFVd9v21QUPolvUqQWPyBYR4eKxa9VU1u5GxqtxgZJk6XtShal6dgqJOQ6N4mpGwfb6baqT3uBNwb8AUDZAw9IPCENBmJ72fbAtElThyqqSUh76MQPISbtBVXhu3ZiJ1PEXPX6yznfOec7517bRD1fabWaGVWIlquunc8klZOnFpSeTYrSs9RLA9Sr6U4tkcvNEi7BFffO6+EdigjL7ZHu/k72I796i9zRiSJPwG4VHX0Z+AxRzNRrtksUvwf7+Gm3BtzzHPDTNgQCqwKXfZwSeNHHJz1OIT8JjtAq6xWtCLwGPLzYZi+3YV8DGMiT4VVuG7oiZpGzrZJhcs/hL49xtzH/Dy6bdfTsXYNY+5yluWO4D4neK/ZUvok/17X0HPBLsF+vuUlhfwX4j/rSfAJ4H1H0qZJ9dN7nR19frRTeBt4Fe9FwpwtN+2p1MXscGLHR9SXrmMgjONd1ZxKzpBeA71b4tNhj6JGoyFNp4GHgwUp9qplfmnFW5oTdy7NamcwCI49kv6fN5IAHgD+0rbyoBc3SOjczohbyS1drbq6pQdqumllRC/0ymTtej8gpbbuVwpQfyw66dqEZyxZKxtHpJn+tZnpnEdrYBbueF9qQn93S7HQGGHnYP7w6L+YGHNtd1FJitqPAR+hERCNOFi1i1alKO6RQnjKUxL1GNjwlMsiEhcPLYTEiT9ISbN15OY/jx4SMshe9LaJRpTvHr3C/ybFYP1PZAfwfYrPsMBtnE6SwN9ib7AhLwTrBDgUKcm06FSrTfSj187xPdVQWOk5Q8vxAfSiIUc7Z7xr6zY/+hpqwSyv0I0/QMTRb7RMgBxNodTfSPqdraz/sDjzKBrv4zu2+a2t0/HHzjd2Lbcc2sG7GtsL42K+xLfxtUgI7YHqKlqHK8HbCCXgjHT1cAdMlDetv4FnQ2lLasaOl6vmB0CMmwT/IPszSueHQqv6i/qluqF+oF9TfO2qEGTumJH0qfSv9KH0nfS/9TIp0Wboi/SRdlb6RLgU5u++9nyXYe69fYRPdil1o1WufNSdTTsp75BfllPy8/LI8G7AUuV8ek6fkvfDsCfbNDP0dvRh0CrNqTbV7LfEEGDQPJQadBtfGVMWEq3QWWdufk6ZSNsjG2PQjp3ZcnOWWing6noonSInvi0/Ex+IzAreevPhe+CawpgP1/pMTMDo64G0sTCXIM+KdOnFWRfQKdJvQzV1+Bt8OokmrdtY2yhVX2a+qrykJfMq4Ml3VR4cVzTQVz+UoNne4vcKLoyS+gyKO6EHe+75Fdt0Mbe5bRIf/wjvrVmhbqBN97RD1vxrahvBOfOYzoosH9bq94uejSOQGkVM6sN/7HelL4t10t9F4gPdVzydEOx83Gv+uNxo7XyL/FtFl8z9ZAHF4bBsrEwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAjdpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzI8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kust+IQAAAxtJREFUOBF9VE1IVVEQnjnnXp8/qanPnogtop1YiyJwKWj7iFzVIkMrgmjdJpMWRfsCNSGiNtk2qMCyTVQQtOhnEWGSf11fWT1LvT9n+ubezEd/wzv3zrkz5zvf+WbOYxEhZmK8hP5jPEkePSQng+R4iAxSDfyYx8nSK6xVICJhOitG/b+Nf8Xoptj1fDDZIMJDk54MdsXlxJjAFjs1DS+0g0efYd4qwtNC7trHgZaXTVdm2yxXVHLD8MIOw3Lo49zwaRkcBO1XFdTenlAvORoCCI6SHw16AH6LNzXUk0uIrU9uufgeB5lgki3M7gI3jgYHbG1+3H0NbpjIHA9ONC8rI9VEuihuHFmqNxw+MrX5dlcqhgipPsx+zlKuhmT501tmvmiYXCTRCnF1/UHnu0f54fn9PPLMVxAFtJRsJzYKolMvHQyhw7VYvn9VTWeNownOjy3WSuImOVe9iySBGvhFq49B+R47mXCGO0DikpaWxKmgcHBsYww2gBd3F/sL9z3xuE6ce0Dhtw6A+JoGdp14drrV0hlosgIELacC6NAXesYSJXFsxOlxyXNr0U4jfAopoIOnLvn+JYJvyFhL1q+iRKfrplhAtR4OEC0x2XmNmNbNLRNY/tQ0FHKagaGcfLwt2Djsqhv8ZmDkVWjmy2B+y5QGzYteCmOmQ/I5uIN51kPKKzOIIDhDuaWNZ/W0LHw76/RJT0tJn/sLU1D/DVydZ4pr4A9LZYpRGCMrpRn2+XqW0kXm570BukxzVa3lmgbsBtKsDV1mWrWUsfiomBbxXHC4eQHrcRtw58qvSH7sQzcKexIL9kLoau3irOwppiruozFJSsXRxYHCUUVWQREVNKT6mZk180SYn6UzBSGKoIUCJJyr8dEWCjJWHCgc06DefAVJ/aaRDz1w9wF3N0J7TF2zldUSei+7U2l1xBG6eAbdd7440HL5F0hv2jI6JS+U5HmFsa0AawP4O1cK6nAZq8DESRR+Yl5+7YjvGhuOLx7ZOvc3kPRbuUbbrlLl0krQin+Damtt6Hnx0nxfy6Imqq3/iWnJsy8bzx9xuZmLOgWIVgAAAABJRU5ErkJggg==";
	var genericIconUrl = "data:image/png;base64,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";
	var tmplt = Mustache.compile(WallTweetTemplate);
	
	// StreamHub Content IDs are global accross all sources of Content,
	// so we need to extract the Tweet ID from it to give twitter web intents
	// what they expect
	// 'tweet-12512312@twitter.com' -> '12512312'
	function tweetIdFromContentId (contentId) {
		if ( ! contentId) {
			return;
		}
		var idParts = contentId.split('@twitter.com'),
			tweetId = ( idParts.length > 0 ) && idParts[0].substring('tweet-'.length);
		return tweetId;
	}

	// StreamHub Author IDs are global accross all sources of Content,
	// so we need to extract the Twitter User ID from it to give twitter web intents
	// what they expect
	// '123@twitter.com' -> '123'
	function twitterUserIdFromAuthor (author) {
		if ( ! author) {
			return;
		}
		var authorId = author.id,
			idParts = authorId && authorId.split('@'),
			twitterUserId = ( idParts.length > 0 ) && idParts[0];
		return twitterUserId;
	}
	
	function buildTwitterAtMention (url)
	{
    	//"https://twitter.com/#!/[username]"
    	var splitUrl = url.split("/");
    	return "@" + splitUrl[splitUrl.length - 1];
    }
	
	function tweetTemplate (data)
	{
		data.tweetId = tweetIdFromContentId(data.id);
		data.author = data.author || {};
		data.author.twitterUserId = twitterUserIdFromAuthor(data.author);
		if (data.source == 1)
		{
			data['iconUrl'] = tweetIconUrl;
			data.author.atMention = buildTwitterAtMention(data.author.profileUrl);
		}
		else
		{
			data['iconUrl'] = genericIconUrl;
		}
		return tmplt(data);
	}
	
	return tweetTemplate;
});