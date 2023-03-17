/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2022
 */
package de.muenchen.isi.filter;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static de.muenchen.isi.TestConstants.SPRING_TEST_PROFILE;

import com.github.tomakehurst.wiremock.http.HttpHeader;
import com.github.tomakehurst.wiremock.http.HttpHeaders;
import de.muenchen.isi.ApiGatewayApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { ApiGatewayApplication.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(SPRING_TEST_PROFILE)
@AutoConfigureWireMock
class GlobalBackendErrorFilterTest {

    @Autowired
    private WebTestClient webTestClient;

    @BeforeEach
    void setup() {
        stubFor(
            get(urlEqualTo("/remote"))
                .willReturn(
                    aResponse()
                        .withStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .withHeaders(
                            new HttpHeaders(
                                new HttpHeader("Content-Type", "application/json"),
                                new HttpHeader(
                                    "WWW-Authenticate",
                                    "Bearer realm=\"Access to the staging site\", charset=\"UTF-8\""
                                ),
                                new HttpHeader("Expires", "Wed, 21 Oct 2099 07:28:06 GMT")
                            )
                        )
                        .withBody("{ \"testkey\" : \"testvalue\" }")
                )
        );
    }

    @Test
    @WithMockUser
    void backendError() {
        webTestClient
            .get()
            .uri("/api/isi-backend-service/remote")
            .exchange()
            .expectStatus()
            .isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR)
            .expectHeader()
            .valueMatches("Content-Type", "application/json")
            .expectHeader()
            .doesNotExist("WWW-Authenticate")
            .expectHeader()
            .valueMatches("Expires", "0")
            .expectBody()
            .jsonPath("$.status")
            .isEqualTo("500")
            .jsonPath("$.error")
            .isEqualTo("Internal Server Error");
    }
}
