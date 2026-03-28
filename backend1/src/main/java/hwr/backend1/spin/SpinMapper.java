package hwr.backend1.spin;

import hwr.backend1.game.model.CellPosition;
import hwr.backend1.game.model.SlotSymbol;
import hwr.backend1.game.model.WinningLineResult;
import hwr.backend1.history.model.SpinRecord;
import hwr.backend1.spin.dto.CellPositionDTO;
import hwr.backend1.spin.dto.SpinResponseDTO;
import hwr.backend1.spin.dto.WinningLineDTO;

import java.util.List;

public class SpinMapper {
    private SpinMapper() {
    }

    public static SpinResponseDTO toDto(SpinRecord spinRecord) {
        return new SpinResponseDTO(
                spinRecord.spinId(),
                spinRecord.betAmount(),
                spinRecord.totalWin(),
                mapMatrix(spinRecord.matrix()),
                mapWinningLines(spinRecord.winningLines()),
                spinRecord.timestamp().toString(),
                0
        );
    }

    public static SpinResponseDTO toDto(SpinRecord spinRecord, int currentBalance) {
        return new SpinResponseDTO(
                spinRecord.spinId(),
                spinRecord.betAmount(),
                spinRecord.totalWin(),
                mapMatrix(spinRecord.matrix()),
                mapWinningLines(spinRecord.winningLines()),
                spinRecord.timestamp().toString(),
                currentBalance
        );
    }

    private static List<List<String>> mapMatrix(SlotSymbol[][] matrix) {
        return java.util.Arrays.stream(matrix)
                .map(row -> java.util.Arrays.stream(row)
                        .map(Enum::name)
                        .toList())
                .toList();
    }

    private static List<WinningLineDTO> mapWinningLines(List<WinningLineResult> winningLines) {
        return winningLines.stream()
                .map(SpinMapper::mapWinningLine)
                .toList();
    }

    private static WinningLineDTO mapWinningLine(WinningLineResult result) {
        return new WinningLineDTO(
                result.paylineId(),
                result.symbol().name(),
                result.count(),
                result.multiplier(),
                result.winAmount(),
                mapPositions(result.positions())
        );
    }

    private static List<CellPositionDTO> mapPositions(List<CellPosition> positions) {
        return positions.stream()
                .map(position -> new CellPositionDTO(position.reel(), position.row()))
                .toList();
    }
}