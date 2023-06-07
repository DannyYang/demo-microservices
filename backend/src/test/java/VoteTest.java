import com.webcomm.tw.svc.vote.VoteApplication;
import com.webcomm.tw.svc.vote.cache.CacheKey;
import com.webcomm.tw.svc.vote.cache.CacheService;
import com.webcomm.tw.svc.vote.vote.VoteException;
import com.webcomm.tw.svc.vote.vote.VoteRecord;
import com.webcomm.tw.svc.vote.vote.VoteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {VoteApplication.class})
public class VoteTest {

    @MockBean
    private CacheService cacheService;

    @Autowired
    private VoteService voteService;

    @Test
    public void testVote_ThrowsVoteExceptionWhenDuplicateVoteNotAllowed() {
        // Arrange
        List<VoteRecord> existingRecords = new ArrayList<>();
        existingRecords.add(new VoteRecord("user1", "option1"));
        when(cacheService.getValue(eq(CacheKey.VOTE), eq(List.class), eq("records")))
                .thenReturn(Optional.of(existingRecords));

        VoteRecord newRecord = new VoteRecord("user1", "option2");

        // Act & Assert
        assertThrows(VoteException.class, () -> voteService.vote(newRecord));
    }
}
