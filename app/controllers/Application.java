package controllers;

import play.Play;
import play.mvc.Before;
import play.mvc.Controller;

public class Application extends Controller {

	@Before
	static void traceRequest() throws Throwable {
		if( ! request.headers.containsKey("play-vertx-delegate") ) {
			Controller.redirect( "http://" 
				+ request.host.replaceAll(
					":" + request.port, 
					String.format(":%s%s", Play.configuration.getProperty("vertx.http.port"), request.url)));
		}
	}

	public static void index() {
		render();
	}
	
}