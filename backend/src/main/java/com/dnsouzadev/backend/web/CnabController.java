package com.dnsouzadev.backend.web;

import com.dnsouzadev.backend.domain.CnabService;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("cnab")
public class CnabController {

    private final CnabService cnabService;

    public CnabController(CnabService cnabService, Job job, JobLauncher jobLauncher) {
        this.cnabService = cnabService;
    }

    @PostMapping("upload")
    public String upload(@RequestParam("file") MultipartFile file) throws Exception {
        cnabService.uploadCnabFile(file);
        return "Processamento iniciado";
    }

}