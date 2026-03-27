package hwr.backend1.history;

import hwr.backend1.history.model.SpinRecord;

import java.util.List;

public interface SpinHistoryService {
    void addSpin(SpinRecord spinRecord);
    List<SpinRecord> getRecentSpins();
    void clearHistory();
}
