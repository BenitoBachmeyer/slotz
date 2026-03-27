package hwr.backend1.history;

import hwr.backend1.history.model.SpinRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InMemorySpinHistoryService implements SpinHistoryService {
    private final List<SpinRecord> history = new ArrayList<>();
    private static final int MAX_HISTORY_SIZE = 50;

    @Override
    public void addSpin(SpinRecord spinRecord) {
        history.addFirst(spinRecord);

        if (history.size() > MAX_HISTORY_SIZE) {
            history.removeLast();
        }
    }

    @Override
    public List<SpinRecord> getRecentSpins() {
        return List.copyOf(history);
    }

    @Override
    public void clearHistory() {
        history.clear();
    }
}
