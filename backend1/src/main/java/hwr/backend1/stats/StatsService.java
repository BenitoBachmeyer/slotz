package hwr.backend1.stats;

import hwr.backend1.history.model.SpinRecord;
import hwr.backend1.stats.dto.StatsDTO;

public interface StatsService {
    StatsDTO getStats();

    void registerSpin(SpinRecord spinRecord);

    void resetStats();
}
