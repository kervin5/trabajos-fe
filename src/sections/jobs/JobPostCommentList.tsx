// @mui
import { Box, List } from '@mui/material';
// @types
import { Job } from '../../@types/jobs';
//
import JobPostCommentItem from './JobPostCommentItem';

// ----------------------------------------------------------------------

type JobPostCommentListProps = {
  job: Job;
};

export default function JobPostCommentList({ job }: JobPostCommentListProps) {
  // const { comments } = post;
  const { comments } = {
    comments: [
      {
        id: 1,
        name: 'Kervin',
        avatarUrl: '',
        postedAt: new Date(),
        replyComment: [],
        users: [],
        message: 'This is cool',
      },
    ],
  };

  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, replyComment, users } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={id} sx={{}}>
            <JobPostCommentItem
              name={comment.name}
              avatarUrl={comment.avatarUrl}
              postedAt={comment.postedAt}
              message={comment.message}
            />
            {/* {hasReply &&
              replyComment.map((reply) => {
                const user = users.find((_user) => _user.id === reply.userId);
                return (
                  <JobPostCommentItem
                    key={reply.id}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    message={reply.message}
                    name={user?.name || ''}
                    avatarUrl={user?.avatarUrl}
                    hasReply
                  />
                );
              })} */}
          </Box>
        );
      })}
    </List>
  );
}
