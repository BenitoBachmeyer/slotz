package hwr.backend1.engine;

import hwr.backend1.game.GameConfigService;
import hwr.backend1.game.model.CellPosition;
import hwr.backend1.game.model.Payline;
import hwr.backend1.game.model.SlotSymbol;
import hwr.backend1.game.model.WinningLineResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WinCalculatorServiceImpl implements WinCalculatorService {
    private final GameConfigService gameConfigService;

    public WinCalculatorServiceImpl(GameConfigService gameConfigService) {
        this.gameConfigService = gameConfigService;
    }

    @Override
    public List<WinningLineResult> calculateWins(SlotSymbol[][] matrix, int betAmount) {
        List<WinningLineResult> results = new ArrayList<>();

        for (Payline payline : gameConfigService.getPaylines()) {
            List<SlotSymbol> lineSymbols = extractLineSymbols(matrix, payline);
            SlotSymbol firstSymbol = lineSymbols.getFirst();
            int count = countConsecutiveFromLeft(lineSymbols);

            Integer multiplier = gameConfigService.getMultiplier(firstSymbol, count);
            if (multiplier != null && count >= 3) {
                int winAmount = betAmount * multiplier;

                List<CellPosition> positions = new ArrayList<>();
                for (int reel = 0; reel < count; reel++) {
                    positions.add(new CellPosition(reel, payline.rows().get(reel)));
                }

                results.add(new WinningLineResult(
                        payline.id(),
                        firstSymbol,
                        count,
                        multiplier,
                        winAmount,
                        positions
                ));
            }
        }

        return results;
    }

    private List<SlotSymbol> extractLineSymbols(SlotSymbol[][] matrix, Payline payline) {
        List<SlotSymbol> symbols = new ArrayList<>();

        for (int reel = 0; reel < payline.rows().size(); reel++) {
            int row = payline.rows().get(reel);
            symbols.add(matrix[row][reel]);
        }

        return symbols;
    }

    private int countConsecutiveFromLeft(List<SlotSymbol> symbols) {
        SlotSymbol first = symbols.getFirst();
        int count = 1;

        for (int i = 1; i < symbols.size(); i++) {
            if (symbols.get(i) == first) {
                count++;
            } else {
                break;
            }
        }

        return count;
    }
}
