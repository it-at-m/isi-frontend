/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2022
 */
package de.muenchen.isi.filter;

import static de.muenchen.isi.TestConstants.SPRING_TEST_PROFILE;

import de.muenchen.isi.ApiGatewayApplication;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { ApiGatewayApplication.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(SPRING_TEST_PROFILE)
class CsrfTokenAppendingHelperFilterTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @WithMockUser
    void csrfCookieAppendition() {
        webTestClient
            .get()
            .uri("/")
            .exchange()
            .expectHeader()
            .valueMatches("set-cookie", "XSRF-TOKEN=[a-f\\d]{8}(-[a-f\\d]{4}){3}-[a-f\\d]{12}?;\\sPath=/");
    }
}
