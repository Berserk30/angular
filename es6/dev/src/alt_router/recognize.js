import { RouteSegment, Tree } from './segments';
import { RoutesMetadata } from './metadata/metadata';
import { isPresent, stringify } from 'angular2/src/facade/lang';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { BaseException } from 'angular2/src/facade/exceptions';
import { reflector } from 'angular2/src/core/reflection/reflection';
export function recognize(componentResolver, type, url) {
    return _recognize(componentResolver, type, url, url.root)
        .then(nodes => new Tree(nodes));
}
function _recognize(componentResolver, type, url, current) {
    let metadata = _readMetadata(type); // should read from the factory instead
    let matched;
    try {
        matched = _match(metadata, url, current);
    }
    catch (e) {
        return PromiseWrapper.reject(e, null);
    }
    return componentResolver.resolveComponent(matched.route.component)
        .then(factory => {
        let segment = new RouteSegment(matched.consumedUrlSegments, matched.parameters, "", matched.route.component, factory);
        if (isPresent(matched.leftOver)) {
            return _recognize(componentResolver, matched.route.component, url, matched.leftOver)
                .then(children => [segment].concat(children));
        }
        else {
            return [segment];
        }
    });
}
function _match(metadata, url, current) {
    for (let r of metadata.routes) {
        let matchingResult = _matchWithParts(r, url, current);
        if (isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    throw new BaseException("Cannot match any routes");
}
function _matchWithParts(route, url, current) {
    let parts = route.path.split("/");
    let parameters = {};
    let consumedUrlSegments = [];
    let u = current;
    for (let i = 0; i < parts.length; ++i) {
        consumedUrlSegments.push(u);
        let p = parts[i];
        if (p.startsWith(":")) {
            let segment = u.segment;
            parameters[p.substring(1)] = segment;
        }
        else if (p != u.segment) {
            return null;
        }
        u = url.firstChild(u);
    }
    return new _MatchingResult(route, consumedUrlSegments, parameters, u);
}
class _MatchingResult {
    constructor(route, consumedUrlSegments, parameters, leftOver) {
        this.route = route;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOver = leftOver;
    }
}
function _readMetadata(componentType) {
    let metadata = reflector.annotations(componentType).filter(f => f instanceof RoutesMetadata);
    if (metadata.length === 0) {
        throw new BaseException(`Component '${stringify(componentType)}' does not have route configuration`);
    }
    return metadata[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1pZDJQZFJ0bi50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcmVjb2duaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsWUFBWSxFQUFjLElBQUksRUFBQyxNQUFNLFlBQVk7T0FDbEQsRUFBQyxjQUFjLEVBQWdCLE1BQU0scUJBQXFCO09BQzFELEVBQU8sU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLDBCQUEwQjtPQUM1RCxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QjtPQUNuRCxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztPQUVyRCxFQUFDLFNBQVMsRUFBQyxNQUFNLHlDQUF5QztBQUVqRSwwQkFBMEIsaUJBQW9DLEVBQUUsSUFBVSxFQUNoRCxHQUFxQjtJQUM3QyxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNwRCxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFlLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELG9CQUFvQixpQkFBb0MsRUFBRSxJQUFVLEVBQUUsR0FBcUIsRUFDdkUsT0FBbUI7SUFDckMsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsdUNBQXVDO0lBRTVFLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxDQUFDO1FBQ0gsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUU7SUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lB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QUssR0FBTCxLQUFLLENBQWU7UUFBUyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWM7UUFDOUQsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFZO0lBQUcsQ0FBQztBQUN6RixDQUFDO0FBRUQsdUJBQXVCLGFBQW1CO0lBQ3hDLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksY0FBYyxDQUFDLENBQUM7SUFDN0YsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxhQUFhLENBQ25CLGNBQWMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlU2VnbWVudCwgVXJsU2VnbWVudCwgVHJlZX0gZnJvbSAnLi9zZWdtZW50cyc7XG5pbXBvcnQge1JvdXRlc01ldGFkYXRhLCBSb3V0ZU1ldGFkYXRhfSBmcm9tICcuL21ldGFkYXRhL21ldGFkYXRhJztcbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBzdHJpbmdpZnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29nbml6ZShjb21wb25lbnRSZXNvbHZlcjogQ29tcG9uZW50UmVzb2x2ZXIsIHR5cGU6IFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogVHJlZTxVcmxTZWdtZW50Pik6IFByb21pc2U8VHJlZTxSb3V0ZVNlZ21lbnQ+PiB7XG4gIHJldHVybiBfcmVjb2duaXplKGNvbXBvbmVudFJlc29sdmVyLCB0eXBlLCB1cmwsIHVybC5yb290KVxuICAgICAgLnRoZW4obm9kZXMgPT4gbmV3IFRyZWU8Um91dGVTZWdtZW50Pihub2RlcykpO1xufVxuXG5mdW5jdGlvbiBfcmVjb2duaXplKGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlciwgdHlwZTogVHlwZSwgdXJsOiBUcmVlPFVybFNlZ21lbnQ+LFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBVcmxTZWdtZW50KTogUHJvbWlzZTxSb3V0ZVNlZ21lbnRbXT4ge1xuICBsZXQgbWV0YWRhdGEgPSBfcmVhZE1ldGFkYXRhKHR5cGUpOyAgLy8gc2hvdWxkIHJlYWQgZnJvbSB0aGUgZmFjdG9yeSBpbnN0ZWFkXG5cbiAgbGV0IG1hdGNoZWQ7XG4gIHRyeSB7XG4gICAgbWF0Y2hlZCA9IF9tYXRjaChtZXRhZGF0YSwgdXJsLCBjdXJyZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZWplY3QoZSwgbnVsbCk7XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudChtYXRjaGVkLnJvdXRlLmNvbXBvbmVudClcbiAgICAgIC50aGVuKGZhY3RvcnkgPT4ge1xuICAgICAgICBsZXQgc2VnbWVudCA9IG5ldyBSb3V0ZVNlZ21lbnQobWF0Y2hlZC5jb25zdW1lZFVybFNlZ21lbnRzLCBtYXRjaGVkLnBhcmFtZXRlcnMsIFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnJvdXRlLmNvbXBvbmVudCwgZmFjdG9yeSk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChtYXRjaGVkLmxlZnRPdmVyKSkge1xuICAgICAgICAgIHJldHVybiBfcmVjb2duaXplKGNvbXBvbmVudFJlc29sdmVyLCBtYXRjaGVkLnJvdXRlLmNvbXBvbmVudCwgdXJsLCBtYXRjaGVkLmxlZnRPdmVyKVxuICAgICAgICAgICAgICAudGhlbihjaGlsZHJlbiA9PiBbc2VnbWVudF0uY29uY2F0KGNoaWxkcmVuKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtzZWdtZW50XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaChtZXRhZGF0YTogUm91dGVzTWV0YWRhdGEsIHVybDogVHJlZTxVcmxTZWdtZW50PixcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBVcmxTZWdtZW50KTogX01hdGNoaW5nUmVzdWx0IHtcbiAgZm9yIChsZXQgciBvZiBtZXRhZGF0YS5yb3V0ZXMpIHtcbiAgICBsZXQgbWF0Y2hpbmdSZXN1bHQgPSBfbWF0Y2hXaXRoUGFydHMociwgdXJsLCBjdXJyZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KG1hdGNoaW5nUmVzdWx0KSkge1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUmVzdWx0O1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkNhbm5vdCBtYXRjaCBhbnkgcm91dGVzXCIpO1xufVxuXG5mdW5jdGlvbiBfbWF0Y2hXaXRoUGFydHMocm91dGU6IFJvdXRlTWV0YWRhdGEsIHVybDogVHJlZTxVcmxTZWdtZW50PixcbiAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBVcmxTZWdtZW50KTogX01hdGNoaW5nUmVzdWx0IHtcbiAgbGV0IHBhcnRzID0gcm91dGUucGF0aC5zcGxpdChcIi9cIik7XG4gIGxldCBwYXJhbWV0ZXJzID0ge307XG4gIGxldCBjb25zdW1lZFVybFNlZ21lbnRzID0gW107XG5cbiAgbGV0IHUgPSBjdXJyZW50O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3VtZWRVcmxTZWdtZW50cy5wdXNoKHUpO1xuICAgIGxldCBwID0gcGFydHNbaV07XG4gICAgaWYgKHAuc3RhcnRzV2l0aChcIjpcIikpIHtcbiAgICAgIGxldCBzZWdtZW50ID0gdS5zZWdtZW50O1xuICAgICAgcGFyYW1ldGVyc1twLnN1YnN0cmluZygxKV0gPSBzZWdtZW50O1xuICAgIH0gZWxzZSBpZiAocCAhPSB1LnNlZ21lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB1ID0gdXJsLmZpcnN0Q2hpbGQodSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBfTWF0Y2hpbmdSZXN1bHQocm91dGUsIGNvbnN1bWVkVXJsU2VnbWVudHMsIHBhcmFtZXRlcnMsIHUpO1xufVxuXG5jbGFzcyBfTWF0Y2hpbmdSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGU6IFJvdXRlTWV0YWRhdGEsIHB1YmxpYyBjb25zdW1lZFVybFNlZ21lbnRzOiBVcmxTZWdtZW50W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgcHVibGljIGxlZnRPdmVyOiBVcmxTZWdtZW50KSB7fVxufVxuXG5mdW5jdGlvbiBfcmVhZE1ldGFkYXRhKGNvbXBvbmVudFR5cGU6IFR5cGUpIHtcbiAgbGV0IG1ldGFkYXRhID0gcmVmbGVjdG9yLmFubm90YXRpb25zKGNvbXBvbmVudFR5cGUpLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBSb3V0ZXNNZXRhZGF0YSk7XG4gIGlmIChtZXRhZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYENvbXBvbmVudCAnJHtzdHJpbmdpZnkoY29tcG9uZW50VHlwZSl9JyBkb2VzIG5vdCBoYXZlIHJvdXRlIGNvbmZpZ3VyYXRpb25gKTtcbiAgfVxuICByZXR1cm4gbWV0YWRhdGFbMF07XG59Il19