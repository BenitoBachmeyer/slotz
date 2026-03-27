package hwr.backend1.game.dto;

import java.util.Map;

public record SymbolPayoutDTO(
        String symbol,
        Map<Integer, Integer> payouts
) {}