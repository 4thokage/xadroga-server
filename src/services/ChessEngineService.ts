const kongAI = require('chess-ai-kong');

export class ChessEngineService {


  withOpts(timeout: number, strategy: string, depth: number) : this {

    kongAI.setOptions({
      depth: depth,
      strategy: strategy,
      timeout: timeout
    });

    return this;
  }

  async playPgn(pgnMoves: string[]): Promise<string> {

    return kongAI.playMoves(pgnMoves);
  }
}
