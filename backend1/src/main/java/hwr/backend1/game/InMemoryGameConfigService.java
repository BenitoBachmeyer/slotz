package hwr.backend1.game;

import hwr.backend1.game.model.Payline;
import hwr.backend1.game.model.SlotConfig;
import hwr.backend1.game.model.SlotSymbol;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class InMemoryGameConfigService implements GameConfigService {

    private static final int REELS = 5;
    private static final int ROWS = 4;
    private static final int PAYLINES = 6;

    private static final int MIN_BET = 1;
    private static final int MAX_BET = 100;
    private static final int DEFAULT_BET = 20;

    private final List<Payline> paylines = List.of(
            new Payline(1, "Top Row", List.of(0, 0, 0, 0, 0)),
            new Payline(2, "Upper Middle", List.of(1, 1, 1, 1, 1)),
            new Payline(3, "Lower Middle", List.of(2, 2, 2, 2, 2)),
            new Payline(4, "Bottom Row", List.of(3, 3, 3, 3, 3)),
            new Payline(5, "V Shape", List.of(0, 1, 2, 1, 0)),
            new Payline(6, "Inverted V", List.of(3, 2, 1, 2, 3))
    );

    private final Map<SlotSymbol, Map<Integer, Integer>> paytable = Map.of(
            SlotSymbol.LEMON, Map.of(3, 2, 4, 5, 5, 10),
            SlotSymbol.BANANA, Map.of(3, 3, 4, 6, 5, 12),
            SlotSymbol.GRAPE, Map.of(3, 4, 4, 8, 5, 16),
            SlotSymbol.STRAWBERRY, Map.of(3, 5, 4, 10, 5, 20),
            SlotSymbol.WATERMELON, Map.of(3, 6, 4, 12, 5, 24),
            SlotSymbol.CHERRY, Map.of(3, 8, 4, 16, 5, 32),
            SlotSymbol.BELL, Map.of(3, 12, 4, 25, 5, 50)
    );

    private final List<List<SlotSymbol>> reelStrips = List.of(
            List.of(
                    SlotSymbol.LEMON,
                    SlotSymbol.BANANA,
                    SlotSymbol.GRAPE,
                    SlotSymbol.CHERRY,
                    SlotSymbol.BELL,
                    SlotSymbol.WATERMELON,
                    SlotSymbol.STRAWBERRY,
                    SlotSymbol.LEMON,
                    SlotSymbol.CHERRY,
                    SlotSymbol.BANANA
            ),
            List.of(
                    SlotSymbol.BELL,
                    SlotSymbol.GRAPE,
                    SlotSymbol.LEMON,
                    SlotSymbol.STRAWBERRY,
                    SlotSymbol.CHERRY,
                    SlotSymbol.BANANA,
                    SlotSymbol.WATERMELON,
                    SlotSymbol.LEMON,
                    SlotSymbol.GRAPE,
                    SlotSymbol.BELL
            ),
            List.of(
                    SlotSymbol.CHERRY,
                    SlotSymbol.WATERMELON,
                    SlotSymbol.BANANA,
                    SlotSymbol.GRAPE,
                    SlotSymbol.LEMON,
                    SlotSymbol.BELL,
                    SlotSymbol.STRAWBERRY,
                    SlotSymbol.CHERRY,
                    SlotSymbol.LEMON,
                    SlotSymbol.BANANA
            ),
            List.of(
                    SlotSymbol.STRAWBERRY,
                    SlotSymbol.LEMON,
                    SlotSymbol.BELL,
                    SlotSymbol.GRAPE,
                    SlotSymbol.BANANA,
                    SlotSymbol.CHERRY,
                    SlotSymbol.WATERMELON,
                    SlotSymbol.LEMON,
                    SlotSymbol.BELL,
                    SlotSymbol.GRAPE
            ),
            List.of(
                    SlotSymbol.WATERMELON,
                    SlotSymbol.CHERRY,
                    SlotSymbol.LEMON,
                    SlotSymbol.BELL,
                    SlotSymbol.BANANA,
                    SlotSymbol.GRAPE,
                    SlotSymbol.STRAWBERRY,
                    SlotSymbol.CHERRY,
                    SlotSymbol.LEMON,
                    SlotSymbol.BELL
            )
    );

    @Override
    public SlotConfig getSlotConfig() {
        return new SlotConfig(
                REELS,
                ROWS,
                PAYLINES,
                MIN_BET,
                MAX_BET,
                DEFAULT_BET,
                paylines,
                paytable
        );
    }

    @Override
    public int getReels() {
        return REELS;
    }

    @Override
    public int getRows() {
        return ROWS;
    }

    @Override
    public int getPaylinesCount() {
        return PAYLINES;
    }

    @Override
    public int getMinBet() {
        return MIN_BET;
    }

    @Override
    public int getMaxBet() {
        return MAX_BET;
    }

    @Override
    public int getDefaultBet() {
        return DEFAULT_BET;
    }

    @Override
    public List<Payline> getPaylines() {
        return paylines;
    }

    @Override
    public List<SlotSymbol> getSymbols() {
        return List.of(SlotSymbol.values());
    }

    @Override
    public Map<SlotSymbol, Map<Integer, Integer>> getPaytable() {
        return paytable;
    }

    @Override
    public Integer getMultiplier(SlotSymbol symbol, int matchCount) {
        Map<Integer, Integer> symbolPayouts = paytable.get(symbol);
        if (symbolPayouts == null) {
            return null;
        }
        return symbolPayouts.get(matchCount);
    }

    @Override
    public List<List<SlotSymbol>> getReelStrips() {
        return reelStrips;
    }
}