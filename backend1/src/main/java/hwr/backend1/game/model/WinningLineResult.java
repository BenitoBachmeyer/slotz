package hwr.backend1.game.model;

import java.util.List;

public record WinningLineResult(
        int paylineId,
        SlotSymbol symbol,
        int count,
        int multiplier,
        int winAmount,
        List<CellPosition> positions
) {}