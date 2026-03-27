package hwr.backend1.engine;

import hwr.backend1.game.GameConfigService;
import hwr.backend1.game.model.SlotSymbol;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ReelGeneratorServiceImpl implements ReelGeneratorService{
    private final GameConfigService gameConfigService;
    private final Random random = new Random();

    public ReelGeneratorServiceImpl(GameConfigService gameConfigService) {
        this.gameConfigService = gameConfigService;
    }

    @Override
    public SlotSymbol[][] generateMatrix() {
        int reels = gameConfigService.getReels();
        int rows = gameConfigService.getRows();

        SlotSymbol[][] matrix = new SlotSymbol[rows][reels];
        List<List<SlotSymbol>> reelStrips = gameConfigService.getReelStrips();

        for (int reelIndex = 0; reelIndex < reels; reelIndex++) {
            List<SlotSymbol> strip = reelStrips.get(reelIndex);
            int startIndex = random.nextInt(strip.size());

            for (int rowIndex = 0; rowIndex < rows; rowIndex++) {
                int symbolIndex = (startIndex + rowIndex) % strip.size();
                matrix[rowIndex][reelIndex] = strip.get(symbolIndex);
            }
        }

        return matrix;
    }
}
