package de.muenchen.isi.services;

import lombok.Data;

@Data
public class Service {

    private String displayName;
    private String infoPath;
    private String scmUrl;
    private boolean appendCommitHash;

}
