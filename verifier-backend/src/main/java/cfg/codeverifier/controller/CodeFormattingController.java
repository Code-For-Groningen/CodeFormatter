package cfg.codeverifier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cfg.codeverifier.services.ClangFormatterService;

@RestController
public class CodeFormattingController {
    @Autowired
    private ClangFormatterService clangFormatterService;

    @PostMapping("/api/v1/format")
    public String formatCode(@RequestBody String code) {
        try {
            return clangFormatterService.formatCode(code);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }
}
