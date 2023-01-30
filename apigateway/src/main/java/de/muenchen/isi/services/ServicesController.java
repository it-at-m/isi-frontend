package de.muenchen.isi.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ServicesController {

    private final ServiceList serviceList;

    @GetMapping("services")
    public ResponseEntity<List<Service>> getServices() {
        return new ResponseEntity<>(serviceList.getServices(), HttpStatus.OK);
    }

}
