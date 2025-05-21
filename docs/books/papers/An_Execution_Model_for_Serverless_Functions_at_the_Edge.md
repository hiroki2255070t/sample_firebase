# ABSTRACT

## アーギュメント

> In this paper, we present a nomenclature for characterizing serverless function access patterns which allows us to derive the basic requirements of a serverless computing runtime. 

著者は、サーバーレス関数のアクセスパターンを分類する命名法を提案。

そして、サーバーレスアプリケーションの要件を満たす代替手法として、WebAssemblyを使用する。

最後に、WebAssemblyベースのサーバーレスプラットフォームが、コンテナベースのプラットフォームと同等のisolationとperformance guaranteesを提供しつつ、average application start timesとthe resources needed to host themを削減する方法を示す。

## 説明

### サーバーレスアプリケーション

サーバーレスアプリケーションは呼び出されたときにインスタンス化され、単一の機能を実行し、終了後にシャットダウンするように設計されている。

### コンテナベースの手法

最先端のサーバーレスプラットフォームは、関数が呼び出されると新しいコンテナインスタンスを作成し、完了時にコンテナを破棄することでこれらの目標を達成する。しかし、コンテナの使用は、低レイテンシ応答を必要とするアプリケーションや、エッジコンピューティング環境で提供されるようなリソースが限られたハードウェアプラットフォームには適さないオーバーヘッドを引き起こす。

## まとめ

サーバーレスアプリケーションをホストするのに、現在ではコンテナを立てることが多い。しかし、コンテナを使う場合、オーバーヘッドが大きくなってしまう。そこでWebAssemblyベースのプラットフォームを用いることで、サーバーレスアプリケーションでの課題を解決する。

# 1. Introduction

## アーギュメント

> In this paper, we present a new method for running serverless functions without the use of containers. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=R9GWUH53))

この論文では、コンテナを使用せずに、serverless functionsを実行する新しい方法を提示する。

> Our work provides two main contributions. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=GQIRA2E2)) First, we introduce a nomenclature for characterizing serverless access patterns. Second, we demonstrate WebAssembly as a viable alternative to the use of containers in serverless platforms through the use of detailed experiments. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=VJFM7V8Y)) In doing so, we provide an answer to the question of how to better orchestrate the execution of a serverless platform to fit the low latency/high multi-tenancy requirements of the edge. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=Y5SZDGHA))

我々のworkは2つの貢献を与える。

1. serverless access patternsを特徴づけるためのnomenclatureを導入する。
    
2. 詳細な実験を通じて、serverless platformsでのコンテナの代替として、WebAssemblyが有効であることを示す。
    

これにより、エッジのlow latency/high multi-tenancy要件に適合するサーバーレスプラットフォームの実行をより良く調整する方法についての答えを提供します。

## 説明

> Although originally designed for the cloud, these platforms are well-suited for edge/fog computing environments, where resources are necessarily limited. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=1&annotation=HTEUFW5F))

元々、Serverless computingはcloud環境で使用することを前提に設計されていた。しかし、この技術は、リソースが限定的なedge/fog computing環境に適している。

> Serverless computing platforms can provide a strong complement to the edge, enabling a high degree of multi-tenancy while minimizing resource requirements ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=1&annotation=KCGQFD33)) .

Serverless computingのプラットフォームは、edgeに強力な補完を提供する。また、resource requirementsを最小限に抑えながら高いmulti-tenancyを実現する。

> While the optimizations employed by container-based serverless platforms do improve performance, these platforms still suffer from inefficiencies associated with container setup costs and resource provisioning. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=2&annotation=QSLZBAGS))

コンテナベースのserverless platformsが採用する最適化はパフォーマンスを向上させる。しかし、これらのプラットフォームは依然としてコンテナのsetup costsやresource provisioningに関連する非効率性に悩まされている。

# 2. Background

## WebAssembly

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
    

## Runtime

> Although one of WebAssembly’s primary goals is to run in a web browser environment, such an environment is not strictly necessary.

WebAssemblyの主な目標の一つはウェブブラウザ環境での実行だが、そのような環境が厳密に必要というわけではない。

- 著者は**NodeJS**を用いて、WebAssemblyベースのserverless platformのプロトタイプの基礎を形成する。
    
    - NodeJSのプラットフォームは、非ブロッキングで非同期のI/O機能を提供し、JavaScriptおよびWebAssemblyで書かれたアプリケーションへの多数の同時接続をサポートする
        
    - NodeJSは、モジュールシステムを通じて追加機能を強力にサポートする高い拡張性を備えている
        

## Compiler Toolchain

**Emscription**

- Emscriptenは、CやC++コードをWebAssembly（.wasm）バイナリに変換する主要なツールである。
    
- EmscriptenはIRを解析してWebAssemblyバイナリコードおよびその他のサポートファイルを生成できる。
    
    - サポートファイルとは、WebAssemblyコードのロードと実行をサポートするJavaScriptファイルのこと。
        
    - Emscriptenは通常、ソースコードの分析に基づいて生成ファイルに追加する必要のある機能を判断できる。しかし、本番ビルドでは、すべての希望するオプションを明示的に指定するのが最も安全。
        
- LLVMのIRであるBitcodeに、変換された外部ファイルを含めることも可能。つまり、既存のコードをWebAssemblyモジュールに移植しやすい。
    

**LLVM**

- 高級言語を中間表現（IR）に変換する。
    
- optimizationやdead code eliminationなどの、タスクを支援するツールを提供する。
    

# 3. Prototype Design

## 3.1 Design Goals

## アーギュメント

> Our WebAssembly-based solution must meet several goals to be considered a viable alternative to the use of containers in a serverless platform. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=3&annotation=MXUEK75M))

我々のWebAssemblyベースの解決策が、コンテナベースのserverless platformの代替として機能するためには、いくつかの条件を満たす必要がある。

## 説明

WebAssemblyベースの解決策が代替案として機能するためには、コンテナベースのserverless platformで実現可能なことは、実現できる必要がある。

その条件が次の三つである。

1. Strong Isolation
    
    - Memory Isolation
        
    - Execution Integrity
        
    - Filesystem Segmentation
        
    - Runtime
        
2. Resource Provisioning
    
    - Maximum Memory Usage
        
    - Execution Time
        
3. Application Creation and Portability
    

### **Strong Isolation**

## アーギュメント

> Our solution must provide isolation in the form of a distinct namespace in which applications can operate. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=3&annotation=JTRGAT7F))

アプリケーションが動作する明確な名前空間の形で分離を提供する必要がある。

> When combined, these language and runtime features of WebAssembly allow us to achieve isolation guarantees similar to those that containers provide to existing serverless computing platforms. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=4&annotation=UEHUP92I))

これらの（下記の説明で述べる）言語およびランタイム機能を組み合わせることで、WebAssemblyは既存のserverless computing platformがコンテナを通じて提供するのと同等の分離保証を実現できます。

## 説明

> This namespace must include memory and process segmentation (such that an application may not influence another’s memory or execution) and filesystem segmentation (such that an application may only read and write its own files). ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=3&annotation=Y3NZESVT))

分離をすべき名前空間は、memoryやprocess segmentation、filesystem segmentationが含まれる。これは、「あるアプリケーションが別のアプリケーションのメモリや実行に影響を与えないようにする」であったり、「アプリケーションが自身のファイルのみを読み書きできるようにする」といった条件である。

#### Memory Isolation

> WebAssembly uses a memory representation that provides access to raw bytes without allowing direct memory access (i.e., pointers are not allowed).

WebAssemblyでは、直接メモリアクセス（つまりポインタ）を許可せずに生のバイトへのアクセスを提供するメモリ表現を使用する。

> Modern WebAssembly execution engines represent these linear memories internally as a JavaScript ArrayBuffer [7]. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=3))

最新のWebAssembly実行エンジンは、これらの線形メモリを内部的にJavaScriptのArrayBufferとして表現する。

#### Execution Integrity

> The WebAssembly stack machine relies on structured control flow for code execution. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=3&annotation=8XW8KDSY))

WebAssemblyのスタックマシンは、コード実行のために構造化された制御フローに依存する。

> As a result, the correctness of an application’s control flow may be verified at compile time and its execution is guaranteed to be largely deterministic.

その結果、アプリケーションの制御フローの正確性はコンパイル時に検証でき、実行はほぼ決定論的であることが保証される。

#### Filesystem Segmentation

> The WebAssembly standard does not specify any guidelines for filesystem access. Instead, this functionality must be implemented by the runtime that is used to execute a WebAssembly application.

WebAssembly標準は、ファイルシステムアクセスに関するガイドラインを指定していない。代わりに、この機能はWebAssemblyアプリケーションを実行するために使用されるランタイムによって実装される必要がある。

> We rely on Emscripten’s library coupled with the NodeJS module vm2 [45] to provide filesystem isolation capability akin to chroot. This provides WebAssembly applications filesystem access restricted to a specific directory.

我々は、EmscriptenのライブラリとNodeJSモジュールのvm2を組み合わせて、chrootに似たファイルシステム分離機能を提供する。これにより、WebAssemblyアプリケーションは特定のディレクトリに制限されたファイルシステムアクセスが可能になる。

#### Runtime

> Ultimately, it is the responsibility of the execution engine to extend functionality and enforce security for any WebAssembly application it runs. Our prototype relies on NodeJS, which in turn embeds V8 for the execution of WebAssembly code. V8 provides isolation between code executions via the notion of contexts.

最終的に、WebAssemblyアプリケーションを実行する実行エンジンは、機能の拡張とセキュリティの強制に責任を持つ。我々のプロトタイプは、WebAssemblyコードの実行のためにV8を組み込むNodeJSに依存する。V8は、コンテキストの概念を介してコード実行間の分離を提供します。

## まとめ

このセクションでは、WebAssemblyの言語機能（メモリ安全性、構造化制御フロー）とランタイム機能（V8コンテキスト、vm2サンドボックス）を活用して、コンテナと同等の分離性を達成する方法が説明されていた。

### Resource Provisioning

## アーギュメント

> We must provide a way for our solution to limit an application’s execution time and maximum memory usage.

我々の解決策は、アプリケーションの実行時間と最大メモリ使用量を制限する方法を提供する必要がある。

## 説明

> Through the use of these features, our runtime may properly provision and control the use of resources for each serverless application it executes.

これらの（下記で説明する）機能を使用することで、我々のランタイムは、実行する各サーバーレスアプリケーションのリソースを適切にプロビジョニングおよび制御できる。

#### Maximum Memory Usage

> Each WebAssembly application has a single linear memory available to it. This memory is created with an initial size upon application load and may later be dynamically grown.

各WebAssemblyアプリケーションは、単一の線形メモリを利用できる。このメモリは、アプリケーションのロード時に初期サイズで作成され、後で動的に拡張できる。

#### Execution Time

> We enforce the maximum runtime of WebAssembly applications via vm2’s timeout property.

我々は、vm2のタイムアウトプロパティを介してWebAssemblyアプリケーションの最大実行時間を強制する。

## まとめ

このセクションでは、WebAssemblyがリソース制約の厳しいエッジ環境で、コンテナと同等のリソース管理を実現する方法が示されていた。

### Application Creation and Portability

## アーギュメント

> The use of WebAssembly in a serverless platform should not require application developers an undue amount of work in porting their existing code to the new runtime.

サーバーレスプラットフォームでのWebAssemblyの使用は、既存のコードを新しいランタイムに移植する際に、アプリケーション開発者に過度な作業を要求すべきではない。

## 説明

> It is source code agnostic, meaning that potentially any programming language can be ported to WebAssembly.

WebAssemblyはソースコードに依存しないため、潜在的には任意のプログラミング言語をWebAssemblyに移植できます。

> WebAssembly is also target platform agnostic, meaning that a WebAssembly binary may be compiled once and run on any architecture where a runtime exists.

WebAssemblyはターゲットプラットフォームにも依存しないため、ランタイムが存在する任意のアーキテクチャで一度コンパイルされたWebAssemblyバイナリを実行できる。

## まとめ

このパラグラフは、WebAssemblyの開発者フレンドリーな特性と移植性を強調し、エッジでのserverless platformの実用性を主張している。

## 3.1 Design Limitations

## アーギュメント

> While our WebAssembly-based solution does provide many of the same advantages as containers, it also has some limitations worth mentioning

我々のWebAssemblyベースの解決策は、コンテナと同じ多くの利点を提供しますが、言及すべきいくつかの制約もあります

## 説明

### Contexts vs. Isolates

## アーギュメント

> At the time of this writing, we were unable to locate a solution that allowed us to create and control V8 isolates via NodeJS while also meeting all of our requirements.

本稿執筆時点では、NodeJSを介してV8 *isolates*を作成および制御し、すべての要件を満たすソリューションを見つけることができなかった。

つまり、V8エンジンで実現できる最も強力な分離を実装できなかった。

## 説明

> Our prototype relies on V8 contexts for segmenting code. While the use of contexts does meet our goals by restricting code executions to unique namespaces and limiting access to resources, it does not represent the strongest form of segmentation offered by V8. The isolates feature of V8 provides finer grained control over segmentation and resource control.

我々のプロトタイプは、コードのセグメンテーションに関してV8 *contexts*に依存している。コンテキストの使用は、コード実行を一意の名前空間に制限し、リソースへのアクセスを制限することで我々の目標を満たすが、V8が提供する最も強力なセグメンテーション形式ではない。V8の*isolates*機能は、セグメンテーションとリソース制御に対してより細かい制御を提供します。

### Performance vs. Native Code

## アーギュメント

> WebAssembly continues to make strides in improving execution speed, but at present native code executes much faster than that of WebAssembly.

WebAssemblyは実行速度の改善に向けて進歩を続けているが、現時点ではネイティブコードはWebAssemblyよりもはるかに速く実行される。

## 説明

> Although the WebAssembly specification does call for code that executes at near-native speeds, the current available runtimes introduce some overhead which can slow execution.

WebAssemblyの仕様では、ネイティブに近い速度で実行されるコードを求めている。しかし、現在利用可能なランタイムは、実行を遅くするいくつかのオーバーヘッドを導入する。

### Hardware-Specific Features/Accelerations

## アーギュメント

> Because WebAssembly is a hardware-agnostic format it lacks support for specific accelerations available via extensions on different architectures.

WebAssemblyはハードウェアに依存しないフォーマットであるが故に、異なるアーキテクチャで利用可能な特定の拡張機能によるアクセラレーションを利用できない。

## まとめ

このセクションは、WebAssemblyベースのserverless platformの提案における現実的な制約を開示し、技術的課題を明確にしている。パラグラフ1（Contexts vs. Isolates）は分離性の限界を、パラグラフ2（Performance vs. Native Code）は実行速度のギャップを、パラグラフ3（Hardware-Specific Features）はハードウェア最適化の欠如をそれぞれ説明し、プロトタイプがコンテナの完全な代替となる前の障壁を示していた。

## 3.3 Implementation

## アーギュメント

> Our goal is to create a prototype which represents basic serverless computing features and demonstrates the use of WebAssembly to execute functions. We model this prototype implementation after core features available in the Apache OpenWhisk platform.

我々の目標は、基本的なサーバーレスコンピューティング機能を提供し、WebAssemblyを使用して関数を実行するプロトタイプを作成することである。このプロトタイプの実装は、Apache OpenWhiskプラットフォームのコア機能をモデルにしている。

## 説明

> This decision is based on the open-source nature of OpenWhisk, which provides for introspection and access to design documentation. Such information allows us to most closely mirror select features of OpenWhisk so that our later prototype evaluation will be as fair as possible.

この決定は、OpenWhiskのオープンソース性に基づいており、設計ドキュメントの内省とアクセスが可能になる。このような情報により、OpenWhiskの選択した機能を最も忠実に再現でき、後のプロトタイプ評価が可能な限り公正になります。

### **OpenWhisk**

OpenWhiskアーキテクチャは、以下の要素で構成される。

- a user-facing reverse proxy web server
    
- a Controller which serves a RESTful API that allows for the control, query, and invocation of functions
    
- an Authentication and Authorization component
    
- a message queue and load balancer
    
- an Invoker which executes functions within their own Docker containers
    

> Of these features, we implement a Controller and an Invoker in our prototype.

これらの機能のうち、我々のプロトタイプでは**Controller**と**Invoker**を実装する。

### Controller

> Our Controller provides access to a RESTful API via a web interface. It is responsible for translating API calls into serverless function invocations and returning the status of these invocations to the caller. The basis for our Controller is the Express web framework for NodeJS.

我々のControllerは、ウェブインターフェースを介してRESTful APIへのアクセスを提供する。API呼び出しをサーバーレス関数の呼び出しに変換し、これらの呼び出しの状態を呼び出し元に返す責任を負う。Controllerの基盤は、NodeJS用のExpressウェブフレームワークである。

### Invoker

> The Invoker is responsible for loading and executing a function’s WebAssembly representation, as well as gathering/returning any results. This process begins with setting up an execution context and loading the function’s WebAssembly code. Currently, the most popular method for loading a WebAssembly application is via the use of its JavaScript API.

Invokerは、関数のWebAssembly表現のロードと実行、および結果の収集/返却を担当する。このプロセスは、実行コンテキストの設定と関数のWebAssemblyコードのロードから始まる。現在、WebAssemblyアプリケーションをロードする最も一般的な方法は、JavaScript APIを使用することである。

# 4. Characterizing serverless function access patterns

## アーギュメント

> Our experimentation suggests that access patterns to serverless functions may be characterized in three basic ways.

我々の実験により、サーバーレス関数のアクセスパターンは3つの基本的な方法で特徴づけられると考えられる。

> The remainder of this section outlines the three access patterns clients may use when accessing serverless computing platforms.

本セクションの残りは、クライアントがサーバーレスコンピューティングプラットフォームにアクセスする際に使用する3つのアクセスパターンを概説する。

## 説明

### Single Client, Multiple Access.

## アーギュメント

> A Single Client, Multiple Access pattern where an already warm container may be reused multiple times represents the best case scenario for a serverless platform.

既にwarmなコンテナを複数回再利用できるSingle Client, Multiple Accessパターンは、サーバーレスプラットフォームにとって最良のケースを表します。

## 説明

> The first call to this function incurs the cold start penalty, creating a delayed start to execution, but subsequent calls execute without delay. In this scenario, the camera is a client which accesses the same instance of the serverless function multiple times in close succession. This access pattern allows for already warm resources (such as an already running container or populated cache) to be reused for subsequent requests, thereby increasing performance and decreasing overall response latency.

この関数の最初の呼び出しはコールドスタートペナルティを伴い、実行の開始に遅延が生じるが、以降の呼び出しは遅延なく実行される。このシナリオでは、カメラは同一のサーバーレス関数のインスタンスに短時間で複数回アクセスするクライアントである。このアクセスパターンは、既にwarmなリソース（例：既に実行中のコンテナや入力済みのキャッシュ）を後続のリクエストに再利用でき、パフォーマンスを向上させ、全体の応答レイテンシを低減する。

### Multiple Client, Single Access.

## アーギュメント

> A Multiple Client, Single Access pattern where all functions incur the cold start penalty represents the worst case scenario for a serverless platform

すべての関数がcoldスタートペナルティを伴うMultiple Client, Single Accessパターンは、serverless platformにとって最悪のケースを表します。

## 説明

> Since this access pattern requires a separate instance of the serverless function to be spawned to handle each request, each instantiation will contribute some initial delay to function response latency (e.g., the cold start penalty for container-based systems).

このアクセスパターンは、各リクエストを処理するためにサーバーレス関数の別々のインスタンスを生成する必要があるため、各インスタンスの生成は関数応答レイテンシに初期の遅延（例：コンテナベースのシステムのcoldスタートペナルティ）を生じさせる。

### Multiple Client, Multiple Access.

## アーギュメント

> Multiple Client, Multiple Access represents the average case scenario for a serverless platform.

Multiple Client, Multiple Accessは、サーバーレスプラットフォームの平均的な（一般的な）ケースを表す。

## 説明

> It is a combination of the first two access patterns and is most representative of real-world workloads.

これは上記2つのアクセスパターンの組み合わせであり、現実世界のワークロードを最も代表します。

> In this scenario, the many cameras are the multiple clients which access separate instances of the same serverless function one or many times.

このシナリオでは、多数のカメラが、同一のサーバーレス関数の別々のインスタンスに1回または複数回アクセスする複数のクライアントである。

# 5. Evaluation

> In this section we describe our methods for evaluating WebAssembly as an alternative to the use of containers in serverless computing platforms. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=7&annotation=E6YD9S93))

このセクションでは、serverless computing platformsにおいて、WebAssemblyがコンテナの代替となることに対する、我々の評価方法について説明する。

## 5.1 Setup

## アーギュメント

> We evaluate our WebAssembly-based serverless computing platform against Apache OpenWhisk, an open-source serverless computing platform which uses the Docker container engine for hosting applications.

我々は、WebAssemblyベースのサーバーレスコンピューティングプラットフォームを、Dockerコンテナエンジンを使用してアプリケーションをホストするオープンソースのサーバーレスコンピューティングプラットフォームであるApache OpenWhiskと比較して評価します。

このセクションでは、WebAssemblyベースのサーバーレスプラットフォームとOpenWhiskの比較評価のための環境と方法論を詳細に説明されている。

## 説明

> Our decision to use OpenWhisk as a comparison platform stems from the fact that its open-source nature allows for careful introspection and configuration of its inner workings.

OpenWhiskを比較プラットフォームとして選択した理由は、そのオープンソース性により内部動作の詳細な内省と設定が可能だからです。

> Since our benchmarks are concerned with the cold start time of containers and since our WebAssembly-based prototype does not include operations such as authentication and accounting, we measure only the duration and initialization times of OpenWhisk when determining how long it requires to execute a serverless function. This methodology provides the closest comparison of the two platforms’ abilities to execute serverless functions while reducing extraneous data such as network latency or overhead incurred by unrelated services.

我々のベンチマークはコンテナのコールドスタート時間に関心があり、WebAssemblyベースのプロトタイプは認証や会計などの操作を含まないため、OpenWhiskのサーバーレス関数の実行に要する時間を決定する際には、実行時間と初期化時間のみを測定します。この方法論は、ネットワークレイテンシや関連のないサービスのオーバーヘッドなどの余分なデータを削減しつつ、2つのプラットフォームのサーバーレス関数実行能力を最も近い形で比較します。

> Benchmarks were conducted from the client-side using the Apache JMeter load testing tool.

ベンチマークは、クライアント側からApache JMeter負荷テストツールを使用して実施されました。

## 5.2 Example Applications

## アーギュメント

> For our evaluations, we created three custom applications representative of serverless functions from the scenarios described in Section 4.

評価のために、セクション4で説明されたシナリオから代表的なサーバーレス関数である3つのカスタムアプリケーションを作成しました。

## 説明

> These applications were written in C++ and statically compiled to native x86 and WebAssembly binaries using clang 6.0.1x and Emscripten 1.38.x, respectively.

これらのアプリケーションはC++で記述され、clang 6.0.1xを使用してネイティブx86バイナリに、Emscripten 1.38.xを使用してWebAssemblyバイナリにそれぞれ静的にコンパイルされました。

> Although both native and WebAssembly applications were statically compiled from the same code, the resulting sizes of their output binaries vary significantly. This is due in large part to Emscripten’s use of dead code elimination when compiling source code to WebAssembly. ・・・. Creating smaller WebAssembly binaries enables faster load times and more efficient code profiling, leading to an overall speedup in execution.

ネイティブおよびWebAssemblyアプリケーションは同一のコードから静的にコンパイルされましたが、出力バイナリのサイズは大きく異なります。これは主に、EmscriptenがソースコードをWebAssemblyにコンパイルする際にデッドコード除去を使用するためです。・・・。より小さなWebAssemblyバイナリを作成することで、ロード時間が短縮され、コードプロファイリングが効率化され、全体的な実行の高速化につながります。

## 5.3 Native vs. WebAssembly Execution Time

> The average execution times for each binary can be seen in Table 2.

|App|x86|wasm|

|----|----|----|

|License Plate Reader|1ms|6ms|

|Image Recognition|30ms|160ms|

|Image Resize|60ms|115ms|

Table 2: Native vs. WebAssembly Execution Speeds

> In this scenario, WebAssembly provides no clear advantage. The overhead of executing WebAssembly code via NodeJS causes delays that far outstrip the execution time of native code.

このシナリオでは、WebAssemblyは明確な利点を提供しません。NodeJSを介してWebAssemblyコードを実行するオーバーヘッドは、ネイティブコードの実行時間を大きく上回る遅延を引き起こします。

## 5.4 Single Client, Multiple Access Workload

## 結果と考察

> As expected, the first requests for all three sample applications experience startup delays associated with container instantiation (in the case of OpenWhisk) or context creation (in the case of WebAssembly). ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=8&annotation=U3E499IJ))

予想通り、3つのサンプルアプリケーションの最初のリクエストは、コンテナのインスタンス化（OpenWhiskの場合）またはコンテキストの作成（WebAssemblyの場合）に関連する起動遅延を経験しました。

***OpenWhisk***

> The OpenWhisk platform experienced delays during the initial calls only, as indicated by the maximum latency value recorded for each function call. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=8&annotation=WSG7JH48)) Subsequent requests were much faster, executing at approximately native speed. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=8&annotation=ET9I59QL)) This initially slow response is due to the cold start penalty associated with creating the first containers, and the subsequent speedup is due to those containers being recycled to service the remaining calls.

OpenWhiskプラットフォームは、各関数呼び出しで記録された最大レイテンシ値が示すように、初期の呼び出しでのみ遅延を経験しました。後続のリクエストははるかに高速で、ほぼネイティブ速度で実行されました。この初期の遅い応答は、最初のコンテナを作成する際のコールドスタートペナルティによるもので、以降のスピードアップは、それらのコンテナが残りの呼び出しを処理するために再利用されたためです。

***Wasm***

> The WebAssembly platform also experienced a small delay during the first calls, but subsequent function calls did not receive the same speedup as those served by containers. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=8&annotation=UC8AG79X)) This behavior caused the WebAssembly platform to perform in a more predictable manner, but slower on average relative to the average latencies of the container-based platform.

WebAssemblyプラットフォームも最初の呼び出しで小さな遅延を経験しましたが、後続の関数呼び出しはコンテナによるものと同じスピードアップを受けませんでした。この動作により、WebAssemblyプラットフォームはより予測可能なパフォーマンスを示しましたが、コンテナベースのプラットフォームの平均レイテンシに比べて平均的に遅かったです。

**まとめ**

> When compared to serverless functions executing in already warm containers, WebAssembly still lags behind.

既にウォームなコンテナで実行されるサーバーレス関数と比較すると、WebAssemblyは依然として遅れをとっています。

> Although WebAssembly’s initial startup time is much better than that of OpenWhisk, over the lifetime of a long-running container this advantage is eroded by native execution speeds resulting in an overall lower average response time.

WebAssemblyの初期起動時間はOpenWhiskよりもはるかに優れていますが、長期間稼働するコンテナの存続期間全体では、ネイティブ実行速度によりこの利点が損なわれ、全体的に平均応答時間が低くなります。

## 5.5 Multiple Client, Single Access Workload

## 結果と考察

***OpenWhisk***

> At least half the clients accessing applications hosted on the OpenWhisk platform suffered from cold start delays, with other clients benefiting from warm containers. ([pdf](zotero://open-pdf/library/items/9PECKM9K?page=9&annotation=I4JCHJVY))

OpenWhiskプラットフォームでホストされるアプリケーションにアクセスするクライアントの少なくとも半数はコールドスタート遅延を経験し、他のクライアントはウォームコンテナの恩恵を受けました。

***Wasm***

> Our WebAssembly platform exhibited lower startup times overall, but was not able to achieve the same level of performance as already warm containers running native code. However, WebAssembly did provide the advantage of more stable, predictable latencies and much lower average latencies for all function calls. Details from our benchmarks can be found in Table 4.

我々のWebAssemblyプラットフォームは全体的に起動時間が短かったものの、既にウォームなコンテナで実行されるネイティブコードと同じパフォーマンスを達成できませんでした。しかし、WebAssemblyはより安定で予測可能なレイテンシと、すべての関数呼び出しにおけるはるかに低い平均レイテンシを提供しました。ベンチマークの詳細は表4に記載されています。

## 5.6 Multiple Client, Multiple Access Workload

> Our goal is to determine whether WebAssembly provides any advantage in reducing the average latency when accessing functions on platforms processing this type of workload.

我々の目標は、WebAssemblyがこのタイプのワークロードを処理するプラットフォームでの関数アクセス時の平均レイテンシを低減する利点を提供するかどうかを判断することです。

## Workloadの設定

> This workload consists of 1 worker accessing the same serverless function 25 times (a Single Client, Multiple Access pattern) and 25 workers accessing the same function 1 time over a 5 second ramp-up period (a Multiple Client, Single Access pattern).

このワークロードは、1つのワーカーが同じサーバーレス関数に25回アクセスする（シングルクライアント、マルチアクセスパターン）と、25のワーカーが5秒のランプアップ期間中に同じ関数に1回アクセスする（マルチクライアント、シングルアクセスパターン）で構成されます。

## 5.7 Discussion of Results

### **Benchmarks.**

**全体の考察**

> The results gathered from our tests suggest that WebAssembly is indeed a viable alternative, despite having its own disadvantages in certain scenarios. During our discussion of these results, we abbreviate several repeated references for the sake of simplicity.

テストから収集した結果は、WebAssemblyが特定のシナリオでの欠点はあるものの、確かに実行可能な代替であることを示唆しています。

> Our benchmarks demonstrate that Wasm performs well over the three given workloads. Although at times this performance is slower than that of OpenWhisk, it is consistent and on average faster. Even when faced with workloads which cause OpenWhisk to experience spikes in latency, Wasm provides relatively stable response times,

我々のベンチマークは、Wasmが与えられた3つのワークロードで良好に機能することを示しています。このパフォーマンスは時折OpenWhiskより遅いものの、一貫しており、平均的には速いです。OpenWhiskがレイテンシの急上昇を経験するワークロードに直面しても、Wasmは比較的安定した応答時間を提供します。

> These results do not necessarily suggest that Wasm is better than OpenWhisk. Certain workloads that are favorable to container reuse still provide superior performance due to Wasm’s slower-than-native execution speeds. However, Wasm does appear to at least be a peer to OpenWhisk and even a viable alternative given certain conditions.

しかし、Wasmは少なくともOpenWhiskと同等であり、特定の条件下では実行可能な代替として現れます。これらの結果は、WasmがOpenWhiskより優れていることを必ずしも示唆するものではありません。コンテナ再利用に有利な特定のワークロードでは、Wasmのネイティブより遅い実行速度のため、依然として優れたパフォーマンスを提供します。

**Single Client, Multiple Access**

***Wasm***

> Given the Single Client, Multiple Access workload, Wasm provides little advantage.

Single Client, Multiple Accessのワークロードでは、Wasmはほとんど利点を提供しません。

***OpenWhisk***

> Despite applications hosted on OpenWhisk incurring the cold start penalty during their initial calls, subsequent calls all executed on warm containers at native speed. These initial cold starts increased average application latencies by approximately 25-50% for the moderate tasks and approximately 400% for the basic task. These results suggest that although OpenWhisk is generally a solid performer for the Single Client, Multiple Access workload, very simple applications will require far more subsequent executions before the cost of the initial cold start is amortized enough to reduce average execution latency.

OpenWhiskでホストされるアプリケーションは初期呼び出しでコールドスタートペナルティを被りますが、後続の呼び出しはすべてウォームコンテナでネイティブ速度で実行されました。これらの初期コールドスタートは、中程度タスクの平均アプリケーションレイテンシを約25-50%、基本タスクを約400%増加させました。これらの結果は、OpenWhiskがシングルクライアント、マルチアクセスのワークロードで一般的に優れたパフォーマーであるものの、非常に単純なアプリケーションでは、初期コールドスタートのコストが十分に分散されて平均実行レイテンシが低減されるまでに、はるかに多くの後続実行が必要であることを示唆しています。

**Multiple Client, Single Access**

***Wasm***

> Wasm begins to show its benefit over OpenWhisk when tasked with the Multiple Client, Single Access workload.

Multiple Client, Single Accessのワークロードでは、WasmがOpenWhiskに対する利点を示し始めます。

***OpenWhisk***

> We initially expected this workload to be problematic for OpenWhisk, with each concurrent request forcing a cold start. However, we found that OpenWhisk handled these requests gracefully and was able to recycle approximately half the containers to avoid cold start penalties.

当初、このワークロードは各同時リクエストがコールドスタートを強制するため、OpenWhiskにとって問題になると予想していました。しかし、OpenWhiskはこれらのリクエストを優雅に処理し、約半分のコンテナを再利用してコールドスタートペナルティを回避できました。

**Multiple Client, Multiple Access**

***Wasm***

> Wasm continued to perform in a consistent manner throughout this workload, achieving best, worst, and average case latencies very similar to the previous two workloads.

Wasmはこのワークロード全体で一貫したパフォーマンスを維持し、前の2つのワークロードと非常に類似したベスト、ワースト、平均ケースのレイテンシを達成しました。

***OpenWhisk***

> OpenWhisk demonstrated similar best case latencies and decreased average case latencies due to less cold starts.

OpenWhiskは同様のベストケースレイテンシを示し、コールドスタートの減少により平均ケースレイテンシが低下しました。（Multiple Client, Single Accessと比較して）

**注意点**

> Access workload will not always achieve an even split between the two access patterns, and that a skew toward one or the other type of request can easily cause more or less cold starts to occur.

Multiple Client, Multiple Accessのワークロードが常に2つのアクセスパターンの均等な分割を達成するわけではなく、リクエストの種類が一方に偏るとコールドスタートがより多くまたは少なく発生する可能性があることに注意します。

### Performance vs. Containers

> Wasm’s primary advantage over container-based solutions is the absence of a large cold start penalty. There are two reasons for this advantage. First, container runtimes such as Docker incur a large amount of overhead in ensuring their support for containers is as broad as possible. … . Second, each Docker container consists of one or more separate processes, whereas each Wasm instance is contained within the same V8 process.

Wasmのコンテナベースのソリューションに対する主な利点は、大きなコールドスタートペナルティがないことです。この利点には2つの理由があります。第1に、Dockerなどのコンテナランタイムは、コンテナのサポートを可能な限り広範に確保するために大きなオーバーヘッドを負います。… 。第2に、各Dockerコンテナは1つ以上の別々のプロセスで構成されていますが、各Wasmインスタンスは同じV8プロセス内に含まれています。

> It is important to keep in mind that WebAssembly is still in a nascent stage and continues to improve at a rapid pace. At present, its biggest advantage over containers is consistent performance and lower average latency when cold starts exist. However, as the project continues to progress execution times will improve significantly.

WebAssemblyはまだ初期段階にあり、急速に改善を続けていることを念頭に置くことが重要です。コンテナに対する最大の利点は、コールドスタートが存在する際の一貫したパフォーマンスと低い平均レイテンシです。しかし、プロジェクトが進展するにつれて、実行時間は大幅に改善されるでしょう。

# 6. Related Work

> The oldest and arguably most popular serverless computing platform, Amazon’s AWS Lambda [2], was first introduced in 2014. Since then, other major cloud providers have followed suit with offerings such as Google’s Cloud Functions [23], IBM’s Cloud Functions [31], and Microsoft’s Azure Functions [4]. ... . As mentioned in the Introduction, these platforms rely on containers for function isolation and are thus susceptible to cold start delays.

最も古く、おそらく最も人気のあるサーバーレスコンピューティングプラットフォームであるAmazonのAWS Lambda [2]は、2014年に初めて導入されました。それ以来、他の主要クラウドプロバイダもGoogleのCloud Functions [23]、IBMのCloud Functions [31]、MicrosoftのAzure Functions [4]などの提供を開始しています。… 。序論で述べたように、これらのプラットフォームは関数の分離にコンテナを使用しており、したがってコールドスタート遅延の影響を受けやすいです。

> Several approaches to improving container-based serverless platforms have been proposed.

コンテナベースのサーバーレスプラットフォームを改善するためのいくつかのアプローチが提案されています。

> Our work takes a different approach to improving serverless computing performance by adapting WebAssembly, a technology from the client-side web browser space, to work on the server-side. … . To our knowledge, our study is the first to quantitatively compare container-based and WebAssembly-based solutions for serverless function execution. We are not aware of the existence of any formal research which has explored WebAssembly for containing and executing serverless functions as an alternative to containers.

我々の研究は、クライアント側のウェブブラウザ空間の技術であるWebAssemblyをサーバー側に適応させることで、サーバーレスコンピューティングのパフォーマンスを改善する、上記とは異なるアプローチを取ります。… 。我々の知る限り、本研究はサーバーレス関数の実行についてコンテナベースとWebAssemblyベースのソリューションを定量的に比較した最初の研究です。コンテナの代替としてWebAssemblyを使用してサーバーレス関数を包含および実行することを探求した正式な研究は存在しないと認識しています。

# 7. Conclusions and Future Work

> The results from these benchmarks showed it to perform consistently across all access patterns. Although its execution speed vs. container-based native binaries is slower, when the cold start penalty of containers is factored in to this calculation its performance is faster on average.

これらのベンチマークの結果は、すべてのアクセスパターンで一貫したパフォーマンスを示しました。コンテナベースのネイティブバイナリと比較して実行速度は遅いものの、コンテナのコールドスタートペナルティを計算に含めると、平均的にはパフォーマンスが速いことがわかりました。

> In addition to its viability as a serverless computing runtime for the Edge, WebAssembly can also prove useful to the IoT domain in general. WebAssembly’s platform-neutral nature lends itself to building applications that can execute across the myriad architectures of devices which comprise the Internet of Things as well as servers in the cloud.

エッジでのサーバーレスコンピューティングランタイムとしての実行可能性に加えて、WebAssemblyはIoT分野全般でも有用であることが証明できます。WebAssemblyのプラットフォームに依存しない性質は、IoTを構成する多様なアーキテクチャのデバイスやクラウドのサーバーで実行可能なアプリケーションの構築に適しています。

> We intend to continue our exploration of WebAssembly as an execution environment for serverless functions in three areas:  
> Full Serverless Platform & Custom Runtime & Benchmarks at Scale

我々は、WebAssemblyをサーバーレス関数の実行環境として、以下の3つの領域で探求を続ける予定です：  
完全なサーバーレスプラットフォーム & カスタムランタイム & 大規模なベンチマーク