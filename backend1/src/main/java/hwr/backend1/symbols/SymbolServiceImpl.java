package hwr.backend1.symbols;

import hwr.backend1.game.GameConfigService;
import hwr.backend1.game.model.SlotSymbol;
import hwr.backend1.paytable.dto.PayoutDTO;
import hwr.backend1.symbols.dto.SymbolsDTO;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class SymbolServiceImpl implements SymbolService {

    private final GameConfigService gameConfigService;

    public SymbolServiceImpl(GameConfigService gameConfigService) {
        this.gameConfigService = gameConfigService;
    }

    @Override
    public List<SymbolsDTO> retrieveSymbolsData() {
        Map<SlotSymbol, Map<Integer, Integer>> paytable = gameConfigService.getPaytable();
        List<List<SlotSymbol>> reelStrips = gameConfigService.getReelStrips();

        return gameConfigService.getSymbols().stream()
                .map(symbol -> {
                    int reelCount = countOccurrences(symbol, reelStrips);

                    List<PayoutDTO> payouts = paytable.getOrDefault(symbol, Map.of())
                            .entrySet()
                            .stream()
                            .sorted(Map.Entry.comparingByKey())
                            .map(entry -> new PayoutDTO(entry.getKey(), entry.getValue()))
                            .toList();

                    return new SymbolsDTO(
                            symbol.name(),
                            toDisplayName(symbol),
                            symbol.name(),
                            getDescription(symbol),
                            determineRarity(reelCount),
                            reelCount,
                            payouts
                    );
                })
                .sorted(Comparator.comparing(SymbolsDTO::reelCount).reversed())
                .toList();
    }

    private int countOccurrences(SlotSymbol symbol, List<List<SlotSymbol>> reelStrips) {
        return reelStrips.stream()
                .flatMap(List::stream)
                .mapToInt(current -> current == symbol ? 1 : 0)
                .sum();
    }

    private String toDisplayName(SlotSymbol symbol) {
        String raw = symbol.name().toLowerCase();
        return Character.toUpperCase(raw.charAt(0)) + raw.substring(1);
    }

    private String determineRarity(int reelCount) {
        if (reelCount >= 10) {
            return "COMMON";
        }
        if (reelCount >= 8) {
            return "UNCOMMON";
        }
        if (reelCount >= 6) {
            return "RARE";
        }
        return "VERY_RARE";
    }

    private String getDescription(SlotSymbol symbol) {
        return switch (symbol) {
            case LEMON -> "Common low-value fruit symbol.";
            case BANANA -> "Frequent fruit symbol with a small payout boost.";
            case GRAPE -> "Balanced mid-tier fruit symbol.";
            case STRAWBERRY -> "Less frequent fruit with stronger payouts.";
            case WATERMELON -> "Rare fruit symbol with higher rewards.";
            case CHERRY -> "Classic slot symbol with strong payout potential.";
            case BELL -> "High-value symbol with the best payout potential.";
        };
    }
}