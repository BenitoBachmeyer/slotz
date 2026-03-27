package hwr.backend1.spin.dto;

import java.util.List;

public record WinningLineDTO(
        int paylineId,
        String symbol,
        int count,
        int multiplier,
        int winAmount,
        List<CellPositionDTO> positions
) {}