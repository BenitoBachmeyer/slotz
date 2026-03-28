package hwr.backend1.symbols;

import hwr.backend1.symbols.dto.SymbolsDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SymbolController {

    private final SymbolService symbolService;

    public SymbolController(SymbolService symbolService) {
        this.symbolService = symbolService;
    }

    @GetMapping("/symbols")
    public ResponseEntity<List<SymbolsDTO>> getSymbolList() {
        return ResponseEntity.ok(symbolService.retrieveSymbolsData());
    }
}
