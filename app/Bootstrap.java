import java.net.URL;

import org.vertx.java.platform.PlatformLocator;
import org.vertx.java.platform.PlatformManager;

import play.Play;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart
public class Bootstrap extends Job {

	public void doJob() {
		PlatformManager pfm = PlatformLocator.factory.createPlatformManager();
		try {
			URL[] classpath = {};
			pfm.deployVerticle( "verticles.DelegateServer", null, classpath, 
				Integer.valueOf(Play.configuration.getProperty("play.pool", "1")), null, null );			
		} catch ( Exception e ) {
			e.printStackTrace();
		}

	}

}