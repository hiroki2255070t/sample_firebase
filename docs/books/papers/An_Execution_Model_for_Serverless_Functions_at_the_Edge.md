# An Execution Model for Serverless Functions at the Edge

## ABSTRACT

### アーギュメント

> In this paper, we present a nomenclature for characterizing serverless function access patterns which allows us to derive the basic requirements of a serverless computing runtime.

著者は、サーバーレス関数のアクセスパターンを分類する命名法を提案。

そして、サーバーレスアプリケーションの要件を満たす代替手法として、WebAssemblyを使用する。

最後に、WebAssemblyベースのサーバーレスプラットフォームが、コンテナベースのプラットフォームと同等のisolationとperformance guaranteesを提供しつつ、average application start timesとthe resources needed to host themを削減する方法を示す。

### 背景

#### サーバーレスアプリケーション

サーバーレスアプリケーションは呼び出されたときにインスタンス化され、単一の機能を実行し、終了後にシャットダウンするように設計されている。

#### コンテナベースの手法

最先端のサーバーレスプラットフォームは、関数が呼び出されると新しいコンテナインスタンスを作成し、完了時にコンテナを破棄することでこれらの目標を達成する。しかし、コンテナの使用は、低レイテンシ応答を必要とするアプリケーションや、エッジコンピューティング環境で提供されるようなリソースが限られたハードウェアプラットフォームには適さないオーバーヘッドを引き起こす。

### まとめ

サーバーレスアプリケーションをホストするのに、現在ではコンテナを立てることが多い。しかし、コンテナを使う場合、オーバーヘッドが大きくなってしまう。そこでWebAssemblyベースのプラットフォームを用いることで、サーバーレスアプリケーションでの課題を解決する。

## 1. Introduction

### アーギュメント

> In this paper, we present a new method for running serverless functions without the use of containers.

この論文では、コンテナを使用せずに、serverless functionsを実行する新しい方法を提示する。

> Our work provides two main contributions. First, we introduce a nomenclature for characterizing serverless access patterns. Second, we demonstrate WebAssembly as a viable alternative to the use of containers in serverless platforms through the use of detailed experiments. In doing so, we provide an answer to the question of how to better orchestrate the execution of a serverless platform to fit the low latency/high multi-tenancy requirements of the edge.

我々のworkは2つの貢献を与える。

1. serverless access patternsを特徴づけるためのnomenclatureを導入する。
    
2. 詳細な実験を通じて、serverless platformsでのコンテナの代替として、WebAssemblyが有効であることを示す。
    

これにより、エッジのlow latency/high multi-tenancy要件に適合するサーバーレスプラットフォームの実行をより良く調整する方法についての答えを提供します。

### 背景

> Although originally designed for the cloud, these platforms are well-suited for edge/fog computing environments, where resources are necessarily limited. 

元々、Serverless computingはcloud環境で使用することを前提に設計されていた。しかし、この技術は、リソースが限定的なedge/fog computing環境に適している。

> Serverless computing platforms can provide a strong complement to the edge, enabling a high degree of multi-tenancy while minimizing resource requirements.

Serverless computingのプラットフォームは、edgeに強力な補完を提供する。また、resource requirementsを最小限に抑えながら高いmulti-tenancyを実現する。

> While the optimizations employed by container-based serverless platforms do improve performance, these platforms still suffer from inefficiencies associated with container setup costs and resource provisioning. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=QSLZBAGS))

コンテナベースのserverless platformsが採用する最適化はパフォーマンスを向上させる。しかし、これらのプラットフォームは依然としてコンテナのsetup costsやresource provisioningに関連する非効率性に悩まされている。

## 2. Background

### WebAssembly

> Several language features make WebAssembly well-suited as an alternative to containers in serverless platforms [42]. First, each WebAssembly module is designed to be memory safe and execute deterministically within a sandboxed environment, providing per-application isolation. Second, a module’s memory is laid out linearly and fixed at compile time, which prevents many well-known security vulnerabilities and errors arising from direct memory access. Third, developers may port existing code intended to be compiled natively to a WebAssembly compilation target with minimal effort. And finally, since WebAssembly is both source language and target platform agnostic, a WebAssembly module may be compiled once and moved freely between different hardware architectures with no reconfiguration.

いくつかの言語機能が、WebAssemblyをserverless platformsにおけるコンテナの代替として適したものにしている。

1. メモリ安全性とサンドボックス環境
    
    - メモリ安全性を持ち、サンドボックス環境内で決定論的に実行されるように設計されており、アプリケーションごとの分離性を提供する。
        
2. 線形メモリモデル
    
    - コンパイル時にメモリが固定され、直接メモリアクセスによる脆弱性を防ぐ。
        
3. コードのポータビリティ
    
    - 開発者はネイティブにコンパイルされる既存のコードを最小限の労力でWebAssemblyコンパイルターゲットに移行できる。
        
4. プラットフォーム非依存性
    
    - WebAssemblyはソース言語およびターゲットプラットフォームに依存しない。
        
    - WebAssemblyモジュールは一度コンパイルすれば、異なるハードウェアアーキテクチャ間で再構成せずに自由に移動できる。
        

> Although WebAssembly shares many concepts with language runtimes such as Java’s JVM or .NET’s CLR, there are some key differences which make it more acceptable as a container replacement. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=MV5NIYEP))

WebAssemblyは、JavaのJVMや.NETのCLRなどの言語ランタイムと多くの概念を共有していますが、コンテナの代替としてより受け入れられるいくつかの重要な違いがあります。

- Javaや.NETとは異なり、WebAssemblyは特定の言語のコンパイルターゲットとして意図されていない。
    
    - プロジェクトが、W3Cによって開発され、主要なウェブブラウザベンダーのサポートを受けている。つまり、単一のエンティティの目的に奉仕する可能性が低いことを示している。
        

- 強力な業界サポート、開発者とエンドユーザーの両方にとっての使いやすさ、そして確かな設計決定により、WebAssemblyは長期的に安全で安定した実行可能なバイナリ形式であり続けるはず。
    

### Runtime

> Although one of WebAssembly’s primary goals is to run in a web browser environment, such an environment is not strictly necessary.

WebAssemblyの主な目標の一つはウェブブラウザ環境での実行だが、そのような環境が厳密に必要というわけではない。

- 著者は**NodeJS**を用いて、WebAssemblyベースのserverless platformのプロトタイプの基礎を形成する。
    
    - NodeJSのプラットフォームは、非ブロッキングで非同期のI/O機能を提供し、JavaScriptおよびWebAssemblyで書かれたアプリケーションへの多数の同時接続をサポートする
        
    - NodeJSは、モジュールシステムを通じて追加機能を強力にサポートする高い拡張性を備えている
        

### Compiler Toolchain

**Emscription**

- Emscriptenは、CやC++コードをWebAssembly（.wasm）バイナリに変換する主要なツールである。
    
- EmscriptenはIRを解析してWebAssemblyバイナリコードおよびその他のサポートファイルを生成できる。
    
    - サポートファイルとは、WebAssemblyコードのロードと実行をサポートするJavaScriptファイルのこと。
        
    - Emscriptenは通常、ソースコードの分析に基づいて生成ファイルに追加する必要のある機能を判断できる。しかし、本番ビルドでは、すべての希望するオプションを明示的に指定するのが最も安全。
        
- LLVMのIRであるBitcodeに、変換された外部ファイルを含めることも可能。つまり、既存のコードをWebAssemblyモジュールに移植しやすい。
    

**LLVM**

- 高級言語を中間表現（IR）に変換する。
    
- optimizationやdead code eliminationなどの、タスクを支援するツールを提供する。