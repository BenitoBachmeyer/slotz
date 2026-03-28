package hwr.backend1.symbols.dto;

import hwr.backend1.paytable.dto.PayoutDTO;

import java.util.List;

public record SymbolsDTO(
        String id,
        String name,
        String imageKey,
        String description,
        String rarity,
        int reelCount,
        List<PayoutDTO> payouts
) {
}
