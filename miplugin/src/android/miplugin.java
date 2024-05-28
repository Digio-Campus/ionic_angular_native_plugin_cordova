package miplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class miplugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        } else if (action.equals("calculator")) {
            int arg0 = args.getInt(0);
            int arg1 = args.getInt(1);
            this.calculator(arg0, arg1, callbackContext);
            return true;
        }
		
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
			callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void calculator(int a, int b, CallbackContext callbackContext) {
		try {
			int result = a+b;
			callbackContext.success(result);
		} catch (Exception e) {
			callbackContext.error("Se esperaban números!!!");
		}
	}
}
