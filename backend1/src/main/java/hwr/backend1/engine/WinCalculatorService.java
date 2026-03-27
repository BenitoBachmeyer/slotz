package hwr.backend1.engine;

import hwr.backend1.game.model.SlotSymbol;
import hwr.backend1.game.model.WinningLineResult;

import java.util.List;

public interface WinCalculatorService {
    List<WinningLineResult> calculateWins(SlotSymbol[][] matrix, int betAmount);
}
