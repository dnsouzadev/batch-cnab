package com.dnsouzadev.backend.web;

import com.dnsouzadev.backend.entity.Transacao;
import com.dnsouzadev.backend.entity.TransacaoReport;
import com.dnsouzadev.backend.service.TransacaoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("transacoes")
public class TransacaoController {
    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5173")
    List<TransacaoReport> listALl() {
        return service.listTotaisTransacoesPorNomeDaLoja();
    }

}
