import {BodyParams, Controller, Post, QueryParams} from "@tsed/common";
import {Required, Returns, Summary} from "@tsed/schema";
import {ChessEngineService} from "../../services/ChessEngineService";
// @ts-ignore
import parser from '@mliebelt/pgn-parser'
@Controller({
  path: "/engines",
})
export class ChessEngineController {

  constructor(private engineService: ChessEngineService) {
  }

  @Post("/analysis")
  @Summary("Displays the best move for a given FEN")
  @Returns(200,  String)
  async bestMove(@Required() pgn: string,
                 @QueryParams("timeout") timeout: number = 10000,
                 @QueryParams("strategy") strategy: string = 'basic',
                 @QueryParams("depth") depth: number = 5,
                 ): Promise<string> {
      // example pgn
    /*
    1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3 Bb4 6.Nxc6 bxc6 7.Qd4 Qe7 8.f3 d5
9.Bg5 O-O 10.O-O-O Bc5 11.Bxf6 gxf6 12.Qa4 Be3+ 13.Kb1 d4 14.Ne2 c5 15.Nc1 Be6
16.Bc4 Rfb8 17.Nd3 Rb6 0-1
     */
    let moves = parser.parse(pgn);


    return this.engineService
      .withOpts(timeout, strategy, depth)
      .playPgn(moves);
  }

}
