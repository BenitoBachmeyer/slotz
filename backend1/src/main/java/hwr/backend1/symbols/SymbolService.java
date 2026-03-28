package hwr.backend1.symbols;

import hwr.backend1.symbols.dto.SymbolsDTO;

import java.util.List;

public interface SymbolService {
    List<SymbolsDTO> retrieveSymbolsData();
}
