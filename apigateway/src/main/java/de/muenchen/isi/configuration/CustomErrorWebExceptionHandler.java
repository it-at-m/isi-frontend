package de.muenchen.isi.configuration;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.autoconfigure.web.reactive.error.DefaultErrorWebExceptionHandler;
import org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.result.view.ViewResolver;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

/**
 * Verwenden der {@link Order} entsprechend der Definition
 * in {@link ErrorWebFluxAutoConfiguration#errorWebExceptionHandler}.
 */
@Component
@Order(-1)
@Slf4j
public class CustomErrorWebExceptionHandler extends DefaultErrorWebExceptionHandler {

    private static final String INVALID_GRANT = "[invalid_grant]";

    public CustomErrorWebExceptionHandler(final ErrorAttributes errorAttributes,
                                          final WebProperties webProperties,
                                          final ServerProperties serverProperties,
                                          final ApplicationContext applicationContext,
                                          final ObjectProvider<ViewResolver> viewResolvers,
                                          final ServerCodecConfigurer serverCodecConfigurer) {
        super(errorAttributes, webProperties.getResources(), serverProperties.getError(), applicationContext);
        this.setViewResolvers(viewResolvers.orderedStream().collect(Collectors.toList()));
        this.setMessageWriters(serverCodecConfigurer.getWriters());
        this.setMessageReaders(serverCodecConfigurer.getReaders());
    }

    @Override
    protected Mono<ServerResponse> renderErrorResponse(final ServerRequest request) {
        final Throwable error = this.getError(request);
        if (!ObjectUtils.isEmpty(error) && StringUtils.startsWith(error.getMessage(), INVALID_GRANT)) {
            log.info("Invalidieren der WebSession und Antwort mit 302 (FOUND).");
            request.exchange().getSession().subscribe(WebSession::invalidate);
            return ServerResponse.status(HttpStatus.FOUND).build();
        }
        return super.renderErrorResponse(request);
    }

}
