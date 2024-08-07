package com.dnsouzadev.backend.service;

import com.dnsouzadev.backend.entity.TipoTransacao;
import com.dnsouzadev.backend.entity.Transacao;
import com.dnsouzadev.backend.entity.TransacaoReport;
import com.dnsouzadev.backend.repository.TransacaoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class TransacaoService {
    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    public List<TransacaoReport> listTotaisTransacoesPorNomeDaLoja() {
        var transacoes = repository.findAllByOrderByNomeDaLojaAscIdDesc();

        var reportMap = new LinkedHashMap<String, TransacaoReport>();

        transacoes.forEach(transacao -> {
            String nomeDaLoja = transacao.nomeDaLoja();
            var tipoTransacao = TipoTransacao.findByTipo(transacao.tipo());
            BigDecimal valor = transacao.valor().multiply(
                    tipoTransacao.getSinal()
            );

            reportMap.compute(nomeDaLoja, (key, existingReport) -> {
                var report = (existingReport != null) ?
                        existingReport : new TransacaoReport(key, BigDecimal.ZERO, new ArrayList<>());

                return report.addToTotal(valor)
                        .addTransacao(transacao.withValor(valor));
            });
        });

        return new ArrayList<>(reportMap.values());
    }
}
