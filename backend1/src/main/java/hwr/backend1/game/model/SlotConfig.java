package hwr.backend1.game.model;

import java.util.List;
import java.util.Map;

public record SlotConfig(
        int reels,
        int rows,
        int paylines,
        int minBet,
        int maxBet,
        int defaultBet,
        List<Payline> paylineDefinitions,
        Map<SlotSymbol, Map<Integer, Integer>> paytable
) {
}
