package cfg.codeverifier.services;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class ClangFormatterService {
    private File clangFormatBinary;

    private File tempDir;

    @PostConstruct
    public void setupTempDir() {
        tempDir = new File("temp");
        if (!tempDir.exists()) {
            tempDir.mkdir();
        }
    }

    @PostConstruct
    public void extractFromClasspath() {
        File result = new File("clang-format");
        if (result.exists()) {
            clangFormatBinary = result;
            return;
        }

        ClassPathResource clangFormatResource = new ClassPathResource("clang/clang-format");
        try {
            InputStream inputStream = clangFormatResource.getInputStream();
            byte[] buffer = inputStream.readAllBytes();
            inputStream.close();

            result.createNewFile();
            result.setExecutable(true);
            result.setWritable(true);
            result.setReadable(true);

            Files.write(result.toPath(), buffer);

            clangFormatBinary = result;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String formatCode(String code) throws IOException, InterruptedException {
        // Setup a process
        ProcessBuilder processBuilder = new ProcessBuilder(clangFormatBinary.getAbsolutePath(),
                "-style={BasedOnStyle: Google, IndentWidth: 3, ColumnLimit: 0}");

        File tempFile = new File(tempDir, UUID.randomUUID() + ".c");
        File tempFileOutput = new File(tempDir, UUID.randomUUID() + ".c");

        // Write the code to a temporary file
        Files.write(tempFile.toPath(), code.getBytes());

        // Redirect the input and output of the process
        processBuilder.redirectInput(tempFile);
        processBuilder.redirectOutput(tempFileOutput);

        // Start the process
        Process process = processBuilder.start();

        // Wait for the process to finish
        process.waitFor(5, TimeUnit.SECONDS);

        if (process.isAlive()) {
            process.destroyForcibly();
            throw new RuntimeException("Clang format timed out");
        }

        // Read the output
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Files.copy(tempFileOutput.toPath(), outputStream);
        outputStream.close();

        // Delete the temporary files
        tempFile.delete();
        tempFileOutput.delete();

        // Return the output
        return outputStream.toString();
    }
}
