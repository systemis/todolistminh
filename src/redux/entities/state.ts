import { TodoTaskEntity } from "@/src/entities/todo.entity";

/**
 * @dev Initialize app state.
 */
export default interface State {
  user: unknown;
  taskList: TodoTaskEntity[],
  // userChats: UserChatEntity[];
  // nft: NftEntity[];
  // proposal: ProposalDto;
  // proposals: SwapProposalEntity[];
  // hProfile: hProfileDto;
  // hPublicProfile: hProfileDto;
  // platformConfig: PlatformConfigDto;
}
