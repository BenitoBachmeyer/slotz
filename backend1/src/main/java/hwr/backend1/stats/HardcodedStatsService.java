package hwr.backend1.stats;

import hwr.backend1.stats.dto.StatsDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HardcodedStatsService implements StatsService {
    @Override
    public StatsDTO retrieveStats() {
        Map<String, Integer> weekProfit = new HashMap<>();
        weekProfit.put("Monday", 240);
        weekProfit.put("Tuesday", -120);
        weekProfit.put("Wednesday", 380);
        weekProfit.put("Thursday", 95);
        weekProfit.put("Friday", 510);

        Map<String, Double> symbolFreq = new HashMap<>();
        symbolFreq.put("Cherries", 19.2);
        symbolFreq.put("Watermelon", 17.5);
        symbolFreq.put("Strawberry", 16.0);
        symbolFreq.put("Grapes", 14.6);
        symbolFreq.put("Banana", 12.8);
        symbolFreq.put("Lemon", 11.1);
        symbolFreq.put("Bell", 8.8);

        return new StatsDTO(
                2480,
                184,
                31.8,
                788,
                50,
                "Bell x5 combo",
                92.4,
                weekProfit,
                symbolFreq
        );
    }
}
