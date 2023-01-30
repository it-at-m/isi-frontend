package de.muenchen.isi.services;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "services")
@Getter
public class ServiceList {

    private List<Service> services;

}
