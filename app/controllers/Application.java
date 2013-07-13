package controllers;

import java.util.Collection;

import javax.inject.Inject;

import play.Logger;
import play.Play;
import play.mvc.Before;
import play.mvc.Controller;
import play.mvc.With;

public class Application extends Controller {

	@Before
	static void traceRequest() throws Throwable {
		if( ! request.headers.containsKey("playonevertx-delegate") ) {
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