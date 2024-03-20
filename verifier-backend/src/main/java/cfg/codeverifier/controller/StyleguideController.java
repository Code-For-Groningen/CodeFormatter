package cfg.codeverifier.controller;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StyleguideController {

    // Returns a PDF file
    @GetMapping(value = "/api/v1/styleguide", produces = "application/pdf")
    public ResponseEntity<InputStreamResource> getStyleguide() throws IOException {
        ClassPathResource pdfFile = new ClassPathResource("styleguide/styleguide.pdf");
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=styleguide.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdfFile.getInputStream()));
    }

}
