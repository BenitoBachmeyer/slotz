package hwr.backend1.spin.dto;

import java.util.List;

public record SpinResponseDTO(
        String spinId,
        int betAmount,
        int totalWin,
        List<List<String>> matrix,
        List<WinningLineDTO> winningLines,
        String timestamp,
        int currentBalance
) {}