package Controller;

import Beans.usuario;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import java.util.List;
import java.util.Map;

/**
 * @document PermisoAction
 * @author José Narváez
 * @versión 25/06/2014
 */
public class InterceptorAcceso extends AbstractInterceptor {

    @Override
    public void destroy() {
    }

    @Override
    public void init() {
    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {
        Map session = actionInvocation.getInvocationContext().getSession();
        usuario usuario = (usuario) session.get("usuario");
        List nombresPermisos = (List) session.get("permisos");
        String actionActual = (String) ActionContext.getContext().get(ActionContext.ACTION_NAME);
        
        if (usuario == null) {

            return Action.LOGIN;
        } else {
           if (nombresPermisos.contains(actionActual)) {
                Action action = (Action) actionInvocation.getAction();
                return actionInvocation.invoke();
            } else {
                return "sinpermiso";
            }

        }
    }
}