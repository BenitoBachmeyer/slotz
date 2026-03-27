package hwr.backend1.spin;

import hwr.backend1.engine.ReelGeneratorService;
import hwr.backend1.engine.WinCalculatorService;
import hwr.backend1.game.GameConfigService;
import hwr.backend1.game.model.SlotSymbol;
import hwr.backend1.game.model.WinningLineResult;
import hwr.backend1.history.SpinHistoryService;
import hwr.backend1.history.model.SpinRecord;
import hwr.backend1.spin.dto.SpinRequestDTO;
import hwr.backend1.spin.dto.SpinResponseDTO;
import hwr.backend1.stats.StatsService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class SpinServiceImpl implements SpinService {
    private final GameConfigService gameConfigService;
    private final ReelGeneratorService reelGeneratorService;
    private final WinCalculatorService winCalculatorService;
    private final SpinHistoryService spinHistoryService;
    private final StatsService statsService;

    public SpinServiceImpl(
            GameConfigService gameConfigService,
            ReelGeneratorService reelGeneratorService,
            WinCalculatorService winCalculatorService,
            SpinHistoryService spinHistoryService,
            StatsService statsService
    ) {
        this.gameConfigService = gameConfigService;
        this.reelGeneratorService = reelGeneratorService;
        this.winCalculatorService = winCalculatorService;
        this.spinHistoryService = spinHistoryService;
        this.statsService = statsService;
    }

    @Override
    public SpinResponseDTO spin(SpinRequestDTO request) {
        validateBet(request.betAmount());

        SlotSymbol[][] matrix = reelGeneratorService.generateMatrix();
        List<WinningLineResult> winningLines = winCalculatorService.calculateWins(matrix, request.betAmount());

        int totalWin = winningLines.stream()
                .mapToInt(WinningLineResult::winAmount)
                .sum();

        SpinRecord spinRecord = new SpinRecord(
                UUID.randomUUID().toString(),
                request.betAmount(),
                matrix,
                winningLines,
                totalWin,
                Instant.now()
        );

        spinHistoryService.addSpin(spinRecord);
        statsService.registerSpin(spinRecord);

        return SpinMapper.toDto(spinRecord);
    }

    private void validateBet(int betAmount) {
        if (betAmount < gameConfigService.getMinBet() || betAmount > gameConfigService.getMaxBet()) {
            throw new IllegalArgumentException(
                    "Bet amount must be between %d and %d"
                            .formatted(gameConfigService.getMinBet(), gameConfigService.getMaxBet())
            );
        }
    }
}
