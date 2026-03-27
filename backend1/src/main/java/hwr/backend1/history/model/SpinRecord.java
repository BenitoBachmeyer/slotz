package hwr.backend1.history.model;

import hwr.backend1.game.model.SlotSymbol;
import hwr.backend1.game.model.WinningLineResult;

import java.time.Instant;
import java.util.List;

public record SpinRecord(
        String spinId,
        int betAmount,
        SlotSymbol[][] matrix,
        List<WinningLineResult> winningLines,
        int totalWin,
        Instant timestamp
) {}
