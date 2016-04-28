import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { WORKER_APP_PLATFORM, WORKER_APP_PLATFORM_MARKER } from 'angular2/src/platform/worker_app_common';
import { WORKER_APP_APPLICATION } from 'angular2/src/platform/worker_app';
import { ReflectiveInjector, coreLoadAndBootstrap, getPlatform, createPlatform, assertPlatform } from 'angular2/core';
export { WORKER_APP_PLATFORM, WORKER_APP_APPLICATION_COMMON } from 'angular2/src/platform/worker_app_common';
export { WORKER_APP_APPLICATION } from 'angular2/src/platform/worker_app';
export { ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments } from 'angular2/src/web_workers/shared/client_message_broker';
export { ReceivedMessage, ServiceMessageBroker, ServiceMessageBrokerFactory } from 'angular2/src/web_workers/shared/service_message_broker';
export { PRIMITIVE } from 'angular2/src/web_workers/shared/serializer';
export * from 'angular2/src/web_workers/shared/message_bus';
export { WORKER_APP_ROUTER } from 'angular2/src/web_workers/worker/router_providers';
export function workerAppPlatform() {
    if (isBlank(getPlatform())) {
        createPlatform(ReflectiveInjector.resolveAndCreate(WORKER_APP_PLATFORM));
    }
    return assertPlatform(WORKER_APP_PLATFORM_MARKER);
}
export function bootstrapApp(appComponentType, customProviders) {
    var appInjector = ReflectiveInjector.resolveAndCreate([WORKER_APP_APPLICATION, isPresent(customProviders) ? customProviders : []], workerAppPlatform().injector);
    return coreLoadAndBootstrap(appInjector, appComponentType);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtaWQyUGRSdG4udG1wL2FuZ3VsYXIyL3BsYXRmb3JtL3dvcmtlcl9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFDLE1BQU0sMEJBQTBCO09BQ3BELEVBQ0wsbUJBQW1CLEVBQ25CLDBCQUEwQixFQUMzQixNQUFNLHlDQUF5QztPQUN6QyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0NBQWtDO09BQ2hFLEVBSUwsa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsY0FBYyxFQUNkLGNBQWMsRUFDZixNQUFNLGVBQWU7QUFFdEIsU0FDRSxtQkFBbUIsRUFDbkIsNkJBQTZCLFFBQ3hCLHlDQUF5QyxDQUFDO0FBQ2pELFNBQVEsc0JBQXNCLFFBQU8sa0NBQWtDLENBQUM7QUFDeEUsU0FDRSxtQkFBbUIsRUFDbkIsMEJBQTBCLEVBQzFCLEtBQUssRUFDTCxXQUFXLFFBQ04sdURBQXVELENBQUM7QUFDL0QsU0FDRSxlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLDJCQUEyQixRQUN0Qix3REFBd0QsQ0FBQztBQUNoRSxTQUFRLFNBQVMsUUFBTyw0Q0FBNEMsQ0FBQztBQUNyRSxjQUFjLDZDQUE2QyxDQUFDO0FBQzVELFNBQVEsaUJBQWlCLFFBQU8sa0RBQWtELENBQUM7QUFFbkY7SUFDRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsY0FBYyxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCw2QkFDSSxnQkFBc0IsRUFDdEIsZUFBd0Q7SUFDMUQsSUFBSSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsZ0JBQWdCLENBQ2pELENBQUMsc0JBQXNCLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUMsRUFDM0UsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDN0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgV09SS0VSX0FQUF9QTEFURk9STSxcbiAgV09SS0VSX0FQUF9QTEFURk9STV9NQVJLRVJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHBfY29tbW9uJztcbmltcG9ydCB7V09SS0VSX0FQUF9BUFBMSUNBVElPTn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHAnO1xuaW1wb3J0IHtcbiAgUGxhdGZvcm1SZWYsXG4gIFR5cGUsXG4gIENvbXBvbmVudFJlZixcbiAgUmVmbGVjdGl2ZUluamVjdG9yLFxuICBjb3JlTG9hZEFuZEJvb3RzdHJhcCxcbiAgZ2V0UGxhdGZvcm0sXG4gIGNyZWF0ZVBsYXRmb3JtLFxuICBhc3NlcnRQbGF0Zm9ybVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuZXhwb3J0IHtcbiAgV09SS0VSX0FQUF9QTEFURk9STSxcbiAgV09SS0VSX0FQUF9BUFBMSUNBVElPTl9DT01NT05cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHBfY29tbW9uJztcbmV4cG9ydCB7V09SS0VSX0FQUF9BUFBMSUNBVElPTn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHAnO1xuZXhwb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlcixcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIEZuQXJnLFxuICBVaUFyZ3VtZW50c1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge1xuICBSZWNlaXZlZE1lc3NhZ2UsXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyLFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnlcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7UFJJTUlUSVZFfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5leHBvcnQge1dPUktFUl9BUFBfUk9VVEVSfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvd29ya2VyL3JvdXRlcl9wcm92aWRlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gd29ya2VyQXBwUGxhdGZvcm0oKTogUGxhdGZvcm1SZWYge1xuICBpZiAoaXNCbGFuayhnZXRQbGF0Zm9ybSgpKSkge1xuICAgIGNyZWF0ZVBsYXRmb3JtKFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFdPUktFUl9BUFBfUExBVEZPUk0pKTtcbiAgfVxuICByZXR1cm4gYXNzZXJ0UGxhdGZvcm0oV09SS0VSX0FQUF9QTEFURk9STV9NQVJLRVIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwQXBwKFxuICAgIGFwcENvbXBvbmVudFR5cGU6IFR5cGUsXG4gICAgY3VzdG9tUHJvdmlkZXJzPzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4pOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICB2YXIgYXBwSW5qZWN0b3IgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShcbiAgICAgIFtXT1JLRVJfQVBQX0FQUExJQ0FUSU9OLCBpc1ByZXNlbnQoY3VzdG9tUHJvdmlkZXJzKSA/IGN1c3RvbVByb3ZpZGVycyA6IFtdXSxcbiAgICAgIHdvcmtlckFwcFBsYXRmb3JtKCkuaW5qZWN0b3IpO1xuICByZXR1cm4gY29yZUxvYWRBbmRCb290c3RyYXAoYXBwSW5qZWN0b3IsIGFwcENvbXBvbmVudFR5cGUpO1xufVxuIl19